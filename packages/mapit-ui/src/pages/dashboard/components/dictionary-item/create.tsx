import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

export const DictionaryItemCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: dictionarySelectProps } = useSelect({
    resource: "dictionary",
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
          label="编码"
          name="code"
          rules={[{ required: true, message: "请输入编码" }]}
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
          label="排序"
          name="sort"
          rules={[{ required: true, message: "请输入排序" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="所属字典"
          name="dictionaryId"
          rules={[{ required: true, message: "请选择所属字典" }]}
        >
          <Select {...dictionarySelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
