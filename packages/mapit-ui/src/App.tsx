import {Authenticated, Refine,} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {ErrorComponent, ThemedLayoutV2, ThemedSiderV2, useNotificationProvider,} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import {App as AntdApp} from "antd";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { ProjectList ,ProjectCreate,ProjectEdit,ProjectShow } from "./pages/project";
import { DictionaryList,DictionaryCreate,DictionaryEdit,DictionaryShow } from "./pages/dictionary";
import { DictionaryItemList,DictionaryItemEdit,DictionaryItemCreate,DictionaryItemShow } from "./pages/dictionary-item";
import {AppIcon} from "./components/app-icon";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {Header} from "./components";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {ForgotPassword} from "./pages/forgotPassword";
import {authProvider} from "./authProvider";

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>
                        <DevtoolsProvider>
                            <Refine
                                dataProvider={dataProvider("/api/v1")}
                                notificationProvider={useNotificationProvider}
                                authProvider={authProvider}
                                routerProvider={routerBindings}
                                resources={[
                                    {
                                        name: "project",
                                        list: "/project",
                                        create: "/project/create",
                                        edit: "/project/edit/:id",
                                        show: "/project/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                    {
                                        name: "dictionary",
                                        list: "/dictionary",
                                        create: "/dictionary/create",
                                        edit: "/dictionary/edit/:id",
                                        show: "/dictionary/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                    {
                                        name: "dictionary-item",
                                        list: "/dictionary-item",
                                        create: "/dictionary-item/create",
                                        edit: "/dictionary-item/edit/:id",
                                        show: "/dictionary-item/show/:id",
                                        meta: {
                                            canDelete: true,
                                        },
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "KyjpGR-yYuDqq-poutkI",
                                    title: {text: "Refine Project", icon: <AppIcon/>},
                                }}
                            >
                                <Routes>
                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-inner"
                                                fallback={<CatchAllNavigate to="/login"/>}
                                            >
                                                <ThemedLayoutV2
                                                    Header={Header}
                                                    Sider={(props) => <ThemedSiderV2 {...props} fixed/>}
                                                >
                                                    <Outlet/>
                                                </ThemedLayoutV2>
                                            </Authenticated>
                                        }
                                    >
                                        <Route
                                            index
                                            element={<NavigateToResource resource="project"/>}
                                        />
                                        <Route path="/project">
                                            <Route index element={<ProjectList/>}/>
                                            <Route path="create" element={<ProjectCreate/>}/>
                                            <Route path="edit/:id" element={<ProjectEdit/>}/>
                                            <Route path="show/:id" element={<ProjectShow/>}/>
                                        </Route>
                                        <Route path="/dictionary">
                                            <Route index element={<DictionaryList/>}/>
                                            <Route path="create" element={<DictionaryCreate/>}/>
                                            <Route path="edit/:id" element={<DictionaryEdit/>}/>
                                            <Route path="show/:id" element={<DictionaryShow/>}/>
                                        </Route>
                                        <Route path="/dictionary-item">
                                            <Route index element={<DictionaryItemList/>}/>
                                            <Route path="create" element={<DictionaryItemCreate/>}/>
                                            <Route path="edit/:id" element={<DictionaryItemEdit/>}/>
                                            <Route path="show/:id" element={<DictionaryItemShow/>}/>
                                        </Route>
                                        <Route path="*" element={<ErrorComponent/>}/>
                                    </Route>
                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-outer"
                                                fallback={<Outlet/>}
                                            >
                                                <NavigateToResource/>
                                            </Authenticated>
                                        }
                                    >
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/register" element={<Register/>}/>
                                        <Route
                                            path="/forgot-password"
                                            element={<ForgotPassword/>}
                                        />
                                    </Route>
                                </Routes>

                                <RefineKbar/>
                                <UnsavedChangesNotifier/>
                                <DocumentTitleHandler/>
                            </Refine>
                            <DevtoolsPanel/>
                        </DevtoolsProvider>
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
