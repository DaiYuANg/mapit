import { ProjectProvider } from '../../../contexts/project.context';
import { Card, Modal, ModalProps } from 'antd';
import { DictionaryList } from './dictionary';
import { DictionaryItemList } from './dictionary-item';
import React, { useState } from 'react';
import { Project } from '../type';

interface DictViewModalProps extends ModalProps {
  project: Project;
}

const DictViewModal = (props: DictViewModalProps) => {
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);

  const { project } = props;
  return (
    <Modal {...props} title={project?.name} width={1200} footer={null} styles={{ body: { padding: 0 } }}>
      {project.id && (
        <ProjectProvider initialProjectId={project.id}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 24,
              padding: 24,
              minHeight: 600,
            }}
          >
            {/* 左侧 */}
            <Card
              style={{ flex: 1, minWidth: 0, height: 500, display: 'flex', flexDirection: 'column' }}
              styles={{ body: { flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' } }}
            >
              {project.id && <DictionaryList projectId={project.id} onDictionarySelect={setSelectedDictionaryId} />}
            </Card>
            {/* 右侧 */}
            <Card
              style={{ flex: 1, minWidth: 0, height: 500, display: 'flex', flexDirection: 'column' }}
              styles={{ body: { flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' } }}
            >
              {project.id && selectedDictionaryId && (
                <DictionaryItemList projectId={project.id} selectedDictionaryId={selectedDictionaryId} />
              )}
            </Card>
          </div>
        </ProjectProvider>
      )}
    </Modal>
  );
};

export { DictViewModal };
export type { DictViewModalProps };
