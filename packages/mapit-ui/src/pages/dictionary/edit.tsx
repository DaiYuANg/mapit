import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Form, Input, Select } from 'antd';
import React from 'react';

export const DictionaryEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: projectSelectProps } = useSelect({
    resource: 'project',
    optionLabel: 'name',
    optionValue: 'id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          name: '',
          code: '',
          description: '',
          projectId: '',
        }}
      >
        <Form.Item
          label="字典名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入字典名称',
            },
          ]}
        >
          <Input placeholder="请输入字典名称" />
        </Form.Item>

        <Form.Item
          label="字典编码"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入字典编码',
            },
          ]}
        >
          <Input placeholder="请输入字典编码" />
        </Form.Item>

        <Form.Item label="字典描述" name="description">
          <Input.TextArea placeholder="请输入字典描述" />
        </Form.Item>

        <Form.Item
          label="所属项目"
          name="projectId"
          rules={[
            {
              required: true,
              message: '请选择所属项目',
            },
          ]}
        >
          <Select {...projectSelectProps} placeholder="请选择所属项目" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
