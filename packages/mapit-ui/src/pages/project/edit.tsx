import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";

export const ProjectEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="项目名称"
          name="name"
          rules={[{ required: true, message: "请输入项目名称" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
