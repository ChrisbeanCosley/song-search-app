import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import { theme } from "./theme";
import { GlobalStateProvider } from "./global-state/GlobalStateContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </MantineProvider>
  </StrictMode>
);
