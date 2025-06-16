import React from 'react';
import { Create, useForm } from '@refinedev/antd';
import { Button, Form, Input, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface ExtraField<T = unknown> {
  key: string;
  value: T;
}

interface FormValues<T = unknown> {
  name: string;
  code: string;
  description?: string;
  sort: number;
  dictionaryId: string;
  extra?: ExtraField<T>[];
}

interface DictionaryItemCreateProps {
  selectedDictionaryId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const DictionaryItemCreate: React.FC<DictionaryItemCreateProps> = ({ selectedDictionaryId, onSuccess }) => {
  const { formProps, saveButtonProps } = useForm({
    resource: 'dictionary-item',
    action: 'create',
    onMutationSuccess: onSuccess,
    defaultFormValues: {
      dictionaryId: selectedDictionaryId,
    },
    meta: {
      transform: <T = unknown,>(values: FormValues<T>): Omit<FormValues<T>, 'extra'> & { extra: Record<string, T> } => {
        const extra = (values.extra || []).reduce<Record<string, T>>((acc, cur) => {
          if (cur.key) acc[cur.key] = cur.value;
          return acc;
        }, {});
        return {
          ...values,
          extra,
        };
      },
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          dictionaryId: selectedDictionaryId || undefined,
        }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="编码" name="code" rules={[{ required: true, message: '请输入编码' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description" rules={[{ required: true, message: '请输入描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: true, message: '请输入排序' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="dictionaryId" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item label="扩展信息">
          <Form.List name="extra">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'key']} rules={[{ required: true, message: '请输入键' }]}>
                      <Input placeholder="键名" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'value']} rules={[{ required: true, message: '请输入值' }]}>
                      <Input placeholder="键值" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加扩展字段
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form>
    </Create>
  );
};
