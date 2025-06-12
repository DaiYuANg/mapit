import React from 'react';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Form, Input, InputNumber, Select } from 'antd';

interface DictionaryItemEditProps {
  id: string;
  selectedDictionaryId: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const DictionaryItemEdit: React.FC<DictionaryItemEditProps> = ({
  id,
  selectedDictionaryId,
  onSuccess,
  onCancel,
}) => {
  const { formProps, saveButtonProps } = useForm({
    resource: 'dictionary-item',
    id,
    action: 'edit',
    onMutationSuccess: onSuccess,
  });

  const { selectProps: dictionarySelectProps } = useSelect({
    resource: 'dictionary',
    optionLabel: 'name',
    optionValue: 'id',
  });

  return (
    <Edit saveButtonProps={saveButtonProps} headerButtons={[]}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="字典项名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入字典项名称',
            },
          ]}
        >
          <Input placeholder="请输入字典项名称" />
        </Form.Item>

        <Form.Item
          label="字典项编码"
          name="code"
          rules={[
            {
              required: true,
              message: '请输入字典项编码',
            },
          ]}
        >
          <Input placeholder="请输入字典项编码" />
        </Form.Item>

        <Form.Item label="字典项描述" name="description">
          <Input.TextArea placeholder="请输入字典项描述" />
        </Form.Item>

        <Form.Item
          label="排序"
          name="sort"
          rules={[
            {
              required: true,
              message: '请输入排序值',
            },
          ]}
        >
          <InputNumber min={0} placeholder="请输入排序值" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="所属字典"
          name="dictionaryId"
          rules={[
            {
              required: true,
              message: '请选择所属字典',
            },
          ]}
        >
          <Select {...dictionarySelectProps} placeholder="请选择所属字典" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
