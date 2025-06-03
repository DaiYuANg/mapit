import { NumberField, Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const DictionaryShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />
      <Title level={5}>字典名称</Title>
      <TextField value={record?.name} />
      <Title level={5}>字典编码</Title>
      <TextField value={record?.code} />
      <Title level={5}>字典描述</Title>
      <TextField value={record?.description} />
      <Title level={5}>所属项目ID</Title>
      <TextField value={record?.projectId} />
    </Show>
  );
};
