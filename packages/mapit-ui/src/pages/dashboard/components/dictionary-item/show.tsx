import { NumberField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

interface DictionaryItemShowProps {
  id: string;
  onCancel: () => void;
}

export const DictionaryItemShow: React.FC<DictionaryItemShowProps> = ({ id, onCancel }) => {
  const { queryResult } = useShow({
    resource: 'dictionary-item',
    id,
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} headerButtons={[]}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />
      <Title level={5}>字典项名称</Title>
      <TextField value={record?.name} />
      <Title level={5}>字典项编码</Title>
      <TextField value={record?.code} />
      <Title level={5}>字典项描述</Title>
      <TextField value={record?.description} />
      <Title level={5}>排序</Title>
      <NumberField value={record?.sort} />
      <Title level={5}>所属字典ID</Title>
      <TextField value={record?.dictionaryId} />
    </Show>
  );
};
