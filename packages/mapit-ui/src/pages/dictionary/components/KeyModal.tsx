import React, { useState } from 'react';
import { Modal, Table, Button, Input, message, Popconfirm } from 'antd';
import { useList, useCreate, useDelete } from '@refinedev/core';

interface KeyModalProps {
  visible: boolean;
  projectId: string;
  onClose: () => void;
}

export const KeyModal: React.FC<KeyModalProps> = ({ visible, projectId, onClose }) => {
  const { data, isLoading, refetch } = useList({
    resource: 'access-key',
    filters: [{ field: 'projectId', operator: 'eq', value: projectId }],
  });

  const { mutate: createKey, isLoading: creating } = useCreate();
  const { mutate: deleteKey } = useDelete();

  const [remark, setRemark] = useState('');

  const handleCreate = () => {
    createKey(
      {
        resource: 'access-key',
        values: { projectId, remark }, // remark 可以为空字符串
      },
      {
        onSuccess: async () => {
          message.success('创建成功');
          setRemark('');
          await refetch();
        },
      },
    );
  };

  const handleDelete = (id: number) => {
    deleteKey(
      { resource: 'access-key', id },
      {
        onSuccess: async () => {
          message.success('删除成功');
          await refetch();
        },
      },
    );
  };

  const handleCopy = async (key: string) => {
    navigator.clipboard.writeText(key);
    message.success('已复制密钥');
  };

  return (
    <Modal open={visible} title="项目密钥管理" onCancel={onClose} footer={null} width={900}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input
          placeholder="请输入备注（可选）"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" loading={creating} onClick={handleCreate}>
          新建密钥
        </Button>
      </div>
      <Table
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data || []}
        pagination={false}
        columns={[
          {
            title: 'AccessKey',
            dataIndex: 'key',
            render: (text: string) => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
          },
          {
            title: 'AccessSecret',
            dataIndex: 'secret',
            render: (text: string) => <span style={{ fontFamily: 'monospace' }}>{text}</span>,
          },
          {
            title: '备注',
            dataIndex: 'remark',
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            render: (text: string) => (text ? new Date(text).toLocaleString() : '-'),
          },
          {
            title: '操作',
            dataIndex: 'id',
            render: (_: any, record: any) => (
              <>
                <Button size="small" onClick={() => handleCopy(record.key)} style={{ marginRight: 8 }}>
                  复制AccessKey
                </Button>
                <Button size="small" onClick={() => handleCopy(record.secret)} style={{ marginRight: 8 }}>
                  复制AccessSecret
                </Button>
                <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.id)}>
                  <Button size="small" danger>
                    删除
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />
    </Modal>
  );
};
