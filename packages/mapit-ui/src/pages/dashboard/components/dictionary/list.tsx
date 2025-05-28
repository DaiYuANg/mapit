import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord, CrudFilter } from "@refinedev/core";
import { Space, Table } from "antd";
import React, { useState } from "react";

interface DictionaryListProps {
  projectId: string;
  onDictionarySelect: (dictionaryId: string | null) => void;
}

export const DictionaryList: React.FC<DictionaryListProps> = ({ 
  projectId,
  onDictionarySelect 
}) => {
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);

  const { tableProps } = useTable({
    resource: 'dictionary',
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {
      permanent: [
        {
          field: "namespace",
          operator: "eq",
          value: projectId,
        } as CrudFilter,
      ],
    },
  });

  const handleRowClick = (record: BaseRecord) => {
    const newSelectedId = record.id as string;
    setSelectedDictionaryId(newSelectedId);
    onDictionarySelect(newSelectedId);
  };

  return (
    <List title={"字典列表"}>
      <Table 
        {...tableProps} 
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: {
            cursor: 'pointer',
            background: selectedDictionaryId === record.id ? '#e6f7ff' : 'inherit',
          },
        })}
      >
        <Table.Column dataIndex="name" title="名称" />
        <Table.Column dataIndex="code" title="编码" />
        <Table.Column dataIndex="description" title="描述" />
        {/*<Table.Column dataIndex="namespace" title="命名空间" />*/}
        <Table.Column
          dataIndex={["project", "name"]}
          title="所属项目"
          render={(_, record) => record.project?.name || "-"}
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
