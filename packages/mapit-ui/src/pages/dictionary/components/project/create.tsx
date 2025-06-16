import { Form, Input, Button, Select } from 'antd';
import React from 'react';
import { useForm } from '@refinedev/antd';

export const ProjectCreateForm: React.FC<{
  onFinish: (values: any) => void;
  onCancel?: () => void;
  loading?: boolean;
}> = ({ onFinish, onCancel, loading }) => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Form {...formProps} layout="vertical" onFinish={onFinish}>
      <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="项目描述" name="description" rules={[{ required: true, message: '请输入项目名称' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="项目类型" name="projectType" rules={[{ required: true, message: '请选择项目类型' }]}>
        <Select
          style={{ width: 120 }}
          options={[
            { value: 0, label: '公共' },
            { value: 1, label: '私有' },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          创建
        </Button>
        {onCancel && (
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            取消
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
