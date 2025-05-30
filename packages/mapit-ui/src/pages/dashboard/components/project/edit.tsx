import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";
import type { Project } from "../../index";

interface ProjectEditProps {
  project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProjectEdit: React.FC<ProjectEditProps> = ({ project, onSuccess, onCancel }) => {
  const { formProps, saveButtonProps, formLoading } = useForm({
    resource: "project",
    id: project.id,
    action: "edit",
    redirect: false,
    successNotification: false,
    onMutationSuccess: () => {
      onSuccess();
    }
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}  headerButtons={[]}>
      <Form {...formProps} layout="vertical" initialValues={{
        name: project.name,
        description: project.description
      }}>
        <Form.Item
          label="项目名称"
          name="name"
          rules={[{ required: true, message: "请输入项目名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="项目描述"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Edit>
  );
};