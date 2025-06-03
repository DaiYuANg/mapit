import { Create, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';
import React from 'react';

export const ProjectCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
