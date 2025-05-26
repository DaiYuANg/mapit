import React, { useState } from 'react';
import { Card, Row, Col, Typography, Collapse, Space, Button, Popconfirm } from 'antd';
import { List } from '@refinedev/antd';
import { useList } from '@refinedev/core';
import { DictionaryList } from '../dictionary';
import { DictionaryItemList } from '../dictionary-item';
import { CSSTransition } from 'react-transition-group';
import './dashboard-animate.css';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Draggable from 'react-draggable';

const { Title } = Typography;

interface Project {
  id: string;
  name: string;
  description?: string;
}

export const Dashboard: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [fabPosition, setFabPosition] = useState({ x: window.innerWidth - 96, y: window.innerHeight - 136 });
  const [fabTransition, setFabTransition] = useState(false);
  
  // 获取项目列表
  const { data: projectsData, refetch } = useList<Project>({
    resource: 'project',
  });

  const projects = projectsData?.data || [];

  // 删除项目
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/v1/project/${id}`, { method: 'DELETE' });
      message.success('删除成功');
      refetch();
      if (selectedProjectId === id) {
        setSelectedProjectId(null);
        setSelectedDictionaryId(null);
      }
    } catch {
      message.error('删除失败');
    }
  };

  return (
    <>
      <List title="项目列表">
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          {projects.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
              <Card
                hoverable
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.card-action-btn')) return;
                  if (selectedProjectId === project.id) {
                    setSelectedProjectId(null);
                    setSelectedDictionaryId(null);
                  } else {
                    setSelectedProjectId(project.id);
                    setSelectedDictionaryId(null);
                  }
                }}
                style={{
                  cursor: 'pointer',
                  border: selectedProjectId === project.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
                  position: 'relative',
                  minHeight: 120,
                }}
                bodyStyle={{ paddingTop: 24, paddingBottom: 16 }}
              >
                <Space style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
                  <Button
                    className="card-action-btn"
                    icon={<EditOutlined />}
                    size="small"
                    type="text"
                    onClick={() => navigate(`/project/edit/${project.id}`)}
                  />
                  <Popconfirm
                    title="确定要删除该项目吗？"
                    onConfirm={() => handleDelete(project.id)}
                    okText="删除"
                    cancelText="取消"
                  >
                    <Button
                      className="card-action-btn"
                      icon={<DeleteOutlined />}
                      size="small"
                      type="text"
                      danger
                    />
                  </Popconfirm>
                </Space>
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <Typography.Title level={4} style={{ marginBottom: 0 }}>
                    {project.name}
                  </Typography.Title>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    ID: <Typography.Text copyable style={{ fontSize: 12 }}>{project.id}</Typography.Text>
                  </Typography.Text>
                  <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0, marginTop: 4 }}>
                    {project.description || '暂无描述'}
                  </Typography.Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        <CSSTransition
          in={!!selectedProjectId}
          timeout={500}
          classNames="fade-slide"
          unmountOnExit
        >
          <Row gutter={16}>
            <Col span={12}>
              <Card title="字典管理">
                <DictionaryList
                  projectId={selectedProjectId!}
                  onDictionarySelect={setSelectedDictionaryId}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="字典项管理">
                <DictionaryItemList
                  projectId={selectedProjectId!}
                  selectedDictionaryId={selectedDictionaryId}
                />
              </Card>
            </Col>
          </Row>
        </CSSTransition>
      </List>
      <Draggable
        defaultPosition={{ x: window.innerWidth - 120, y: window.innerHeight - 120 }}
      >
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
          onClick={() => navigate('/project/create')}
        />
      </Draggable>
    </>
  );
}; 