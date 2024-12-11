import { scan } from "react-scan";
import React from "react";
import { createRoot } from "react-dom/client";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {RefineKbarProvider} from "@refinedev/kbar";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <App />
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
