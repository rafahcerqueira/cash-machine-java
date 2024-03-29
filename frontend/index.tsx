import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src";
import { ThemeProvider } from "@mui/material";
import { themeMUI } from "./src/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={themeMUI}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
