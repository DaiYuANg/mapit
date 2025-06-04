import React from 'react';
import { useLogin, useNavigation } from '@refinedev/core';
import { message, Typography } from 'antd';
import { Row, Col, Card, Form, Input, Button } from 'antd';

export const Login = () => {
  const { mutate: login, isLoading } = useLogin();
  const { push } = useNavigation();

  const onFinish = (values: any) => {
    login(
      {
        username: values.username,
        password: values.password
      },
      {
        onSuccess: (res: any) => {
          console.log(res);
          if (String(res.code) === "200") {
            message.success('登录成功');
            push('/');
          }
        },
        onError: () => {
          message.error('登录失败，请重新尝试');
        }
      }
    );
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Col>
        <Card style={{ width: 368 }}>
          <Typography.Title level={3} style={{ color: '#1890ff', marginBottom: 24, textAlign: 'center' }}>
            登录到您的账户
          </Typography.Title>
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ username: 'admin', password: '123456' }}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="账号"
              rules={[{ required: true, message: '请输入你的账号' }]}
            >
              <Input size="large" placeholder="输入你的账号" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入你的密码' }]}
            >
              <Input.Password size="large" placeholder="输入你的密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={isLoading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
