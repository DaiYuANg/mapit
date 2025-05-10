import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import dataProvider from "@refinedev/simple-rest";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {BrowserRouter, Route, Routes, Outlet} from "react-router";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import {
  BlogPostList,
  BlogPostCreate,
  BlogPostEdit,
  BlogPostShow,
} from "./pages/dictionary";
import {
  ProjectList,
  ProjectCreate,
  CategoryEdit,
  ProjectShow,
} from "./pages/project";
import {AppIcon} from "./components/app-icon";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {Header} from "./components/header";
import {Login} from "./pages/login";
import {Register} from "./pages/register";
import {ForgotPassword} from "./pages/forgotPassword";
import {authProvider} from "./authProvider";
import {resource} from "./resource";
import {RouteComponent} from "./route";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner/>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline/>
          <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("/api")}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                routerProvider={routerBindings}
                resources={resource}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "RIGugK-j9UzJM-g5v45W",
                  title: {text: "Refine Project", icon: <AppIcon/>},
                }}
              >
                <RouteComponent/>
                <RefineKbar/>
                <UnsavedChangesNotifier/>
                <DocumentTitleHandler/>
              </Refine>
              <DevtoolsPanel/>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
