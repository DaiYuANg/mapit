import { message, Modal, ModalProps } from 'antd';
import { ProjectCreateForm } from './project/create';
import React from 'react';
import { useCreate } from '@refinedev/core';

interface CreateProjectModalProps extends ModalProps {
  onSuccess?: () => void;
}

const CreateProjectModal = (props: CreateProjectModalProps) => {
  const { mutate: createProject, isLoading: createLoading } = useCreate();
  return (
    <Modal {...props} footer={null} title="新建项目" destroyOnHidden>
      <ProjectCreateForm
        loading={createLoading}
        onFinish={(values) => {
          createProject(
            { resource: 'project', values },
            {
              onSuccess: async () => {
                message.success('创建成功');
                props.onSuccess?.();
              },
            },
          );
        }}
      />
    </Modal>
  );
};

export { CreateProjectModal };

export type { CreateProjectModalProps };
