import {Authenticated, GitHubBanner, Refine} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {BrowserRouter} from "react-router";
import {authProvider} from "./authProvider";
import {AppIcon} from "./components/app-icon";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {MapitRoute} from "./route";
import {Resource} from "./resource";
import { dataProvider } from "./rest-data-provider";

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
                dataProvider={dataProvider("/api/v1")}
                notificationProvider={useNotificationProvider}
                authProvider={authProvider}
                routerProvider={routerBindings}
                resources={Resource}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "6eZGhG-lynuh2-Vpg3lT",
                  title: {text: "Refine Project", icon: <AppIcon/>},
                }}
              >
                <MapitRoute/>
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
