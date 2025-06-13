import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Button, Popconfirm, Modal, Pagination, Spin } from 'antd';
import { DictionaryList } from './components/dictionary';
import { DictionaryItemList } from './components/dictionary-item';
import './dashboard-animate.css';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  KeyOutlined,
  ExportOutlined,
  SyncOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import Draggable from 'react-draggable';
import { useDelete, useCreate, useList, useCustom } from '@refinedev/core';
import { ProjectCreateForm } from './components/project/create';
import { ProjectEdit } from './components/project/edit';
import { KeyModal } from './components/KeyModal';
import { useModal } from '@refinedev/antd';
import { ExportModal } from './ExportModal';

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export const DictionaryView: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { show, close, modalProps } = useModal({
    modalProps: {
      onCancel() {
        close();
      },
    },
  });
  const { mutate: deleteProject } = useDelete();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const { mutate: createProject, isLoading: createLoading } = useCreate();
  const { data, refetch } = useList<Project>({ resource: 'project' });
  const projects: Project[] = data?.data ?? [];
  const total = projects.length;
  const pagedProjects = projects.slice((page - 1) * pageSize, page * pageSize);
  const emptyCount = pageSize - pagedProjects.length;
  const handleDelete = (id: string) => {
    deleteProject(
      {
        resource: 'project',
        id,
      },
      {
        onSuccess: async () => {
          message.success('删除成功');
          await refetch();
          if (selectedProjectId === id) {
            setSelectedProjectId(null);
            setSelectedDictionaryId(null);
          }
        },
        onError: async () => {
          message.error('删除失败');
        },
      },
    );
  };
  const handleCardClick = (project: Project) => {
    setCurrentProject(project);
    setSelectedProjectId(project.id);
    setSelectedDictionaryId(null);
    setModalVisible(true);
  };
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [keyModal, setKeyModal] = useState({ visible: false, projectId: '' });
  return (
    <>
      <Typography.Title level={4}>项目列表</Typography.Title>
      <Row gutter={[12, 32]} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pagedProjects.map((project: Project) => (
          <Col key={project.id} style={{ flex: '0 0 20%', maxWidth: '20%' }}>
            <Card
              hoverable
              style={{
                cursor: 'pointer',
                position: 'relative',
                minHeight: 120,
                ...(selectedProjectId === project.id ? { boxShadow: '0 0 0 2px #1890ff' } : {}),
              }}
              styles={{ body: { paddingTop: 24, paddingBottom: 16 } }}
              onClick={() => handleCardClick(project)}
            >
              <Space style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                <Button
                  className="card-action-btn"
                  icon={<EditOutlined />}
                  size="small"
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditProject(project);
                    setEditModalVisible(true);
                  }}
                />
                <Button
                  className="card-action-btn"
                  icon={<KeyOutlined />}
                  size="small"
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    setKeyModal({ visible: true, projectId: project.id });
                  }}
                />
                <Popconfirm
                  title="确定要删除该项目吗？"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    handleDelete(project.id);
                  }}
                  okText="删除"
                  cancelText="取消"
                >
                  <Button
                    className="card-action-btn"
                    icon={<DeleteOutlined />}
                    size="small"
                    type="text"
                    danger
                    onClick={(e) => e.stopPropagation()}
                  />
                </Popconfirm>
              </Space>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                  {project.name}
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  ID:{' '}
                  <Typography.Text copyable style={{ fontSize: 12 }}>
                    {project.id}
                  </Typography.Text>
                </Typography.Text>
                <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0, marginTop: 4 }}>
                  {project.description || '暂无描述'}
                </Typography.Paragraph>
              </Space>
              <Space direction={'horizontal'} wrap>
                <Button
                  size="small"
                  color={'green'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProjectId(project.id);
                    show();
                  }}
                  type="text"
                  icon={<ExportOutlined />}
                >
                  Export
                </Button>
                <Button size="small" type="text" icon={<ImportOutlined />} color={'cyan'}>
                  Import
                </Button>
                <Button size="small" type="text" icon={<SyncOutlined />} color={'cyan'}>
                  Sync
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
        {Array.from({ length: emptyCount }).map((_, idx) => (
          <Col key={`empty-${idx}`} style={{ flex: '0 0 20%', maxWidth: '20%' }} />
        ))}
      </Row>
      <Row justify="center" style={{ margin: '16px 0' }}>
        <Pagination current={page} pageSize={pageSize} total={total} onChange={setPage} showSizeChanger={false} />
      </Row>
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        title={currentProject?.name}
        width={1200}
        footer={null}
        styles={{ body: { padding: 0 } }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 24,
            padding: 24,
            minHeight: 600,
          }}
        >
          {/* 左侧 */}
          <Card
            style={{ flex: 1, minWidth: 0, height: 500, display: 'flex', flexDirection: 'column' }}
            styles={{ body: { flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' } }}
          >
            {selectedProjectId && (
              <DictionaryList projectId={selectedProjectId} onDictionarySelect={setSelectedDictionaryId} />
            )}
          </Card>
          {/* 右侧 */}
          <Card
            style={{ flex: 1, minWidth: 0, height: 500, display: 'flex', flexDirection: 'column' }}
            styles={{ body: { flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' } }}
          >
            {selectedProjectId && (
              <DictionaryItemList projectId={selectedProjectId} selectedDictionaryId={selectedDictionaryId} />
            )}
          </Card>
        </div>
      </Modal>
      <Draggable defaultPosition={{ x: window.innerWidth - 120, y: window.innerHeight - 120 }}>
        <Button
          className="draggable-handle"
          type="primary"
          shape="circle"
          size="large"
          icon={<PlusOutlined />}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 16px #1890ff44',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            cursor: 'grab',
            transition: 'transform 0.1s',
          }}
          onClick={() => setCreateModalVisible(true)}
        />
      </Draggable>
      <Modal
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        title="新建项目"
        destroyOnHidden
      >
        <ProjectCreateForm
          loading={createLoading}
          onFinish={(values) => {
            createProject(
              { resource: 'project', values },
              {
                onSuccess: async () => {
                  message.success('创建成功');
                  setCreateModalVisible(false);
                  await refetch();
                },
              },
            );
          }}
          onCancel={() => setCreateModalVisible(false)}
        />
      </Modal>
      <Modal
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        title="编辑项目"
        destroyOnHidden
      >
        {editProject && (
          <ProjectEdit
            project={editProject}
            onSuccess={async () => {
              setEditModalVisible(false);
              await refetch();
            }}
            onCancel={() => setEditModalVisible(false)}
          />
        )}
      </Modal>
      {selectedProjectId && <ExportModal {...modalProps} projectId={selectedProjectId} onClose={close} />}
      <KeyModal
        visible={keyModal.visible}
        projectId={keyModal.projectId}
        onClose={() => setKeyModal({ visible: false, projectId: '' })}
      />
    </>
  );
};
