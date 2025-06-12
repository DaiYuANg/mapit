import { Authenticated, Refine } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import '../i18n';
import { ErrorComponent, ThemedLayoutV2, ThemedSiderV2, useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { i18nProvider } from './i18nProvider';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import { AppIcon } from './components/app-icon';
import { ColorModeContextProvider } from './contexts/color-mode';
import { Header } from './components';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ForgotPassword } from './pages/forgotPassword';
import { authProvider } from './authProvider';
import { DictionaryView } from './pages/dictionary';
import { BookOutlined, DashboardOutlined } from '@ant-design/icons';
import dataProvider from '@refinedev/simple-rest';
import { request } from './api/request';
import { Dashboard } from './pages/dsahboard';

const App = () => (
  <BrowserRouter>
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider('', request)}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              routerProvider={routerBindings}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: { canDelete: false, label: '仪表盘', icon: <DashboardOutlined /> },
                },
                {
                  name: 'dictionary',
                  list: '/dictionary',
                  meta: { canDelete: false, label: '字典', icon: <BookOutlined /> },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: 'KyjpGR-yYuDqq-poutkI',
                title: { text: '字典服务管理平台', icon: <AppIcon /> },
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated key="authenticated-inner" fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={Header} Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path={'dictionary'} element={<DictionaryView />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  </BrowserRouter>
);

export default App;
