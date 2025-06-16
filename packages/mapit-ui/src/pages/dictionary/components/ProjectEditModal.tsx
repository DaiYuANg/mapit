import { Modal, ModalProps } from 'antd';
import { Project } from '../type';
import { ProjectEdit } from './project/edit';
import React from 'react';

interface ProjectEditModalProps extends ModalProps {
  project: Project;
  onSuccess?: () => void;
}

const ProjectEditModal = (props: ProjectEditModalProps) => {
  const { project, onSuccess } = props;

  return (
    <Modal {...props} footer={null} title="编辑项目" destroyOnHidden>
      {project && (
        <ProjectEdit
          project={project}
          onSuccess={() => {
            onSuccess?.();
          }}
          onCancel={() => {
            props.afterClose?.();
          }}
        />
      )}
    </Modal>
  );
};

export { ProjectEditModal };
export type { ProjectEditModalProps };
