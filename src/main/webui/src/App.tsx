import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { authProvider } from "./provider/authProvider";
import { AppIcon } from "./components/app-icon";
import { MapitDataProvider } from "./provider/dataProvider";
import { RoutesDefine } from "./router/Route";

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={MapitDataProvider("/api")}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "project",
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              // projectId: "OrunVQ-62vC1W-gYJY7u",
              title: { text: "Mapit", icon: <AppIcon /> },
            }}
          >
            <RoutesDefine />
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineSnackbarProvider>
    </>
  );
}

export default App;
