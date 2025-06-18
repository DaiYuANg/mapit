import { ProjectProvider } from '../../../contexts/project.context';
import { Card, Modal, ModalProps } from 'antd';
import { DictionaryList } from './dictionary';
import { DictionaryItemList } from './dictionary-item';
import React, { useState } from 'react';
import { Project } from '../type';
import { DictView } from '../../../components/DictView';

interface DictViewModalProps extends ModalProps {
  project: Project;
}

const DictViewModal = (props: DictViewModalProps) => {
  const { project } = props;
  return (
    <Modal {...props} title={project?.name} width={1200} footer={null} styles={{ body: { padding: 0 } }}>
      {project.id && <DictView projectId={project.id} />}
    </Modal>
  );
};

export { DictViewModal };
export type { DictViewModalProps };
