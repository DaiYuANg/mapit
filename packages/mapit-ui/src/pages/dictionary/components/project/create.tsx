import { Form, Input, Button } from 'antd';
import React from 'react';

export const ProjectCreateForm: React.FC<{
  onFinish: (values: any) => void;
  onCancel?: () => void;
  loading?: boolean;
}> = ({ onFinish, onCancel, loading }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
        <Input />
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
