import { DateField, DeleteButton, EditButton, List, MarkdownField, ShowButton, useTable } from '@refinedev/antd';
import { type BaseRecord, useMany } from '@refinedev/core';
import { Space, Table } from 'antd';
import React from 'react';

export const ProjectList = () => {
  const { tableProps } = useTable({
    resource: 'project',
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'project',
    ids: tableProps?.dataSource?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List title={'项目列表'}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title={'项目名称'} />
        <Table.Column dataIndex="id" title={'ID'} />
        <Table.Column
          title={'操作'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
