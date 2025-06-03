import { DateField, MarkdownField, NumberField, Show, TextField } from '@refinedev/antd';
import { useOne, useShow } from '@refinedev/core';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const ProjectShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: 'project',
    id: record?.category?.id || '',
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <TextField value={record?.id} />
      <Title level={5}>{'名称'}</Title>
      <TextField value={record?.name} />
    </Show>
  );
};
