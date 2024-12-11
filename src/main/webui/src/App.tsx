import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { authProvider } from "./provider/authProvider";
import { AppIcon } from "./components/app-icon";
import { MapitDataProvider } from "./provider/dataProvider";
import { RoutesDefine } from "./router/Route";
import { resource } from "./router/resource";

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <DevtoolsProvider url={"localhost"}>
          <Refine
            dataProvider={MapitDataProvider("/api")}
            notificationProvider={notificationProvider}
            authProvider={authProvider}
            routerProvider={routerBindings}
            resources={resource}
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
