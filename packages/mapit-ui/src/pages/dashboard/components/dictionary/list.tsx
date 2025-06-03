import { CreateButton, DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd';
import type { BaseRecord, CrudFilter } from '@refinedev/core';
import { Button, Modal, Space, Table } from 'antd';
import React, { useState } from 'react';
import { DictionaryCreate } from './create';
import { DictionaryEdit } from './edit';
import { DictionaryShow } from './show';

interface DictionaryListProps {
  projectId: string;
  onDictionarySelect: (dictionaryId: string | null) => void;
}

export const DictionaryList: React.FC<DictionaryListProps> = ({ projectId, onDictionarySelect }) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);
  const [editDictionaryId, setEditDictionaryId] = useState<string | null>(null);
  const [showDictionaryId, setShowDictionaryId] = useState<string | null>(null);

  const { tableProps, tableQueryResult } = useTable({
    resource: 'dictionary/paginated',
    pagination: { current: 1, pageSize: 10 },
    filters: {
      permanent: [
        {
          field: 'projectId',
          operator: 'eq',
          value: projectId,
        } as CrudFilter,
      ],
    },
    queryOptions: {
      queryKey: ['dictionary/paginated', projectId],
      enabled: !!projectId,
    },
  });

  const handleRowClick = (record: BaseRecord) => {
    const newSelectedId = record.id as string;
    setSelectedDictionaryId(newSelectedId);
    onDictionarySelect(newSelectedId);
  };

  return (
    <List
      title={'字典列表'}
      headerButtons={
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          新建
        </Button>
      }
    >
      <Table
        {...tableProps}
        scroll={{ y: 300 }}
        size="small"
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: {
            cursor: 'pointer',
          },
        })}
      >
        <Table.Column dataIndex="name" title="名称" width={120} />
        {/*<Table.Column dataIndex="code" title="编码" width={120} />*/}
        <Table.Column dataIndex="description" title="描述" width={80} />
        <Table.Column
          width={120}
          title={'操作'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                onClick={() => setEditDictionaryId(record.id ? String(record.id) : null)}
              />
              <ShowButton
                hideText
                size="small"
                onClick={() => setShowDictionaryId(record.id ? String(record.id) : null)}
              />
              <DeleteButton
                resource="dictionary"
                hideText
                size="small"
                onSuccess={() => {
                  tableQueryResult?.refetch();
                }}
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
      <Modal
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        title="新建字典"
        destroyOnHidden
      >
        <DictionaryCreate
          onSuccess={() => {
            setCreateModalVisible(false);
            // 这里可以加刷新逻辑，比如 refetch table 数据
            tableQueryResult?.refetch();
          }}
          onCancel={() => setCreateModalVisible(false)}
        />
      </Modal>
      <Modal open={!!editDictionaryId} onCancel={() => setEditDictionaryId(null)} footer={null} destroyOnHidden>
        {editDictionaryId && (
          <DictionaryEdit
            id={editDictionaryId}
            onSuccess={() => {
              setEditDictionaryId(null);
              tableQueryResult?.refetch();
            }}
            onCancel={() => setEditDictionaryId(null)}
          />
        )}
      </Modal>

      <Modal open={!!showDictionaryId} onCancel={() => setShowDictionaryId(null)} footer={null} destroyOnHidden>
        {showDictionaryId && <DictionaryShow id={showDictionaryId} onCancel={() => setShowDictionaryId(null)} />}
      </Modal>
    </List>
  );
};
