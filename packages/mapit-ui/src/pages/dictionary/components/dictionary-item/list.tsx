import { CreateButton, DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd';
import type { BaseRecord, CrudFilter } from '@refinedev/core';
import { Space, Table, Modal, Empty } from 'antd';
import React, { useState } from 'react';
import { DictionaryItemCreate } from './create';
import { DictionaryItemEdit } from './edit';
import { DictionaryItemShow } from './show';

interface DictionaryItemListProps {
  projectId: string;
  selectedDictionaryId: string;
}

export const DictionaryItemList: React.FC<DictionaryItemListProps> = ({ projectId, selectedDictionaryId }) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showId, setShowId] = useState<string | null>(null);

  const { tableProps, tableQueryResult } = useTable({
    resource: 'dictionary-item/paginated',
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {
      permanent: selectedDictionaryId
        ? [
            {
              field: 'dictionaryId',
              operator: 'eq',
              value: selectedDictionaryId,
            } as CrudFilter,
          ]
        : [],
    },
    queryOptions: {
      enabled: !!selectedDictionaryId,
    },
  });

  if (!selectedDictionaryId) {
    return (
      <List title={'字典项列表'}>
        <Empty description="请先选择字典" style={{ margin: '48px 0' }} />
      </List>
    );
  }

  return (
    <List title={'字典项列表'} headerButtons={<CreateButton onClick={() => setCreateModalVisible(true)} />}>
      <Table {...tableProps} rowKey="id" scroll={{ y: 300 }} size="small">
        <Table.Column dataIndex="name" title="名称" width={120} />
        <Table.Column dataIndex="code" title="编码" width={120} />
        <Table.Column dataIndex="description" title="描述" width={80} />
        <Table.Column
          width={120}
          title={'操作'}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" onClick={() => setEditId(record.id ? String(record.id) : null)} />
              <ShowButton hideText size="small" onClick={() => setShowId(record.id ? String(record.id) : null)} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                onSuccess={() => tableQueryResult?.refetch()}
              />
            </Space>
          )}
        />
      </Table>
      {/* 新建弹窗 */}
      <Modal open={createModalVisible} onCancel={() => setCreateModalVisible(false)} footer={null} destroyOnClose>
        <DictionaryItemCreate
          selectedDictionaryId={selectedDictionaryId}
          onSuccess={async () => {
            setCreateModalVisible(false);
            tableQueryResult?.refetch();
          }}
          onCancel={() => setCreateModalVisible(false)}
        />
      </Modal>

      {/* 编辑弹窗 */}
      <Modal open={!!editId} onCancel={() => setEditId(null)} footer={null} destroyOnClose>
        {editId && (
          <DictionaryItemEdit
            id={editId}
            selectedDictionaryId={selectedDictionaryId}
            onSuccess={() => {
              setEditId(null);
              tableQueryResult?.refetch();
            }}
            onCancel={() => setEditId(null)}
          />
        )}
      </Modal>

      {/* 查看弹窗 */}
      <Modal open={!!showId} onCancel={() => setShowId(null)} footer={null} destroyOnClose>
        {showId && <DictionaryItemShow id={showId} onCancel={() => setShowId(null)} />}
      </Modal>
    </List>
  );
};
