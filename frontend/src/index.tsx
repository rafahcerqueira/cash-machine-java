import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { SnackbarProvider } from "notistack";
import Routes from "./routes";
import "./styles/global.css";

const App: React.FC = () => {
  const isPRD = import.meta.env.APP_ENV;
  const underConstruction =
    isPRD == "PRD" && Boolean(import.meta.env.UNDER_CONSTRUCTION);

  return (
    <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider>
          <Routes underConstruction={underConstruction} />
        </SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
