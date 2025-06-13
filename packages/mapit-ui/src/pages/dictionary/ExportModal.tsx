import { Button, Modal, ModalProps, Spin } from 'antd';
import { allExpanded, defaultStyles, JsonView } from 'react-json-view-lite';
import { useCustom, useOne } from '@refinedev/core';
import 'react-json-view-lite/dist/index.css';
import { useCallback } from 'react';

interface ExportModalProps extends ModalProps {
  projectId: string;
  onClose: () => void;
}

const ExportModal = (modalProps: ExportModalProps) => {
  const { data: exportData, isLoading } = useCustom({
    method: 'post',
    url: `/project/${modalProps.projectId}/export-dictionaries`,
  });

  const { data: currentProject } = useOne({
    resource: 'project',
    id: modalProps.projectId,
  });

  const handleDownload = useCallback(() => {
    if (currentProject) {
      const project = currentProject.data;
      const json = JSON.stringify(exportData, null, 2); // 美化格式
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      console.log(project);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.name}_export.json`; // 自定义文件名
      a.click();

      URL.revokeObjectURL(url);
    }
  }, [currentProject, exportData]);

  return (
    <>
      <Modal
        {...modalProps}
        footer={[
          <Button key="back" onClick={modalProps.onClose}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleDownload}>
            下载
          </Button>,
        ]}
      >
        导出字典数据
        {exportData && (
          <JsonView data={exportData} clickToExpandNode shouldExpandNode={allExpanded} style={defaultStyles} />
        )}
        {isLoading && <Spin />}
      </Modal>
    </>
  );
};

export { ExportModal };
