import { Create, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';
import React from 'react';
import { useProject } from '../../../../contexts/useProject';

interface DictionaryCreateProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const DictionaryCreate: React.FC<DictionaryCreateProps> = ({ onSuccess, onCancel }) => {
  const { projectId } = useProject();

  const { formProps, saveButtonProps } = useForm({
    resource: 'dictionary',
    onMutationSuccess: () => {
      onSuccess?.();
    },
    defaultFormValues: {
      projectId: projectId ? projectId : '',
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="code" name="code" rules={[{ required: true, message: '请输入 code' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="projectId" hidden>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Create>
  );
};
