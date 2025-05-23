import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import React from "react";

export const DictionaryCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: projectSelectProps } = useSelect({
    resource: "project",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="code"
          name="code"
          rules={[{ required: true, message: "请输入 code" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: "请输入描述" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="所属项目"
          name="projectId"
          rules={[{ required: true, message: "请选择项目" }]}
        >
          <Select {...projectSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};