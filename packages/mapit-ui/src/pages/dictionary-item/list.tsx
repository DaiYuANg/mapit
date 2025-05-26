import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const DictionaryItemList = () => {
  const { tableProps } = useTable();

  return (
    <List title={"字典项列表"}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="名称" />
        <Table.Column dataIndex="code" title="编码" />
        <Table.Column dataIndex="description" title="描述" />
        <Table.Column dataIndex="sort" title="排序" />
        <Table.Column
          dataIndex={["dictionary", "name"]}
          title="所属字典"
          render={(_, record) => record.dictionary?.name || "-"}
        />
        <Table.Column
          title={"操作"}
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
