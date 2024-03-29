import React from "react";
import { Routes as Router, Outlet, Route } from "react-router-dom";
import PrivateRoutes from "./Private";
import PublicRoutes from "./Public";
import { useAuth } from "@/hooks";
import { Paper, PaperOutlet } from "@/styles/Paper/styles";
import Sidebar from "@/components/globals/Layout/Sidebar";
import Header from "@/components/globals/Layout/Header";

import UnderConstruction from "@/pages/Auth/UnderConstruction";

const CheckAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <PublicRoutes />;
  }

  return (
    <Paper>
      <Sidebar />
      <PaperOutlet>
        <Header />
        <Outlet />
      </PaperOutlet>
    </Paper>
  );
};

const Routes = ({ underConstruction = true }) => {
  if (underConstruction) {
    return (
      <Router>
        <Route path="/" element={<UnderConstruction />} />
      </Router>
    );
  }

  return (
    <Router>
      <Route element={<CheckAuth />}>
        <Route path="/" element={<PrivateRoutes />}>
          {/* Auth */}
          <Route path="/primeiro-acesso" element={<PublicRoutes />} />
          <Route path="/resetar-senha" element={<PublicRoutes />} />
          {/* Manutenção */}
          <Route path="/extrato" element={<PrivateRoutes />} />
          <Route path="/extrato/:id" element={<PrivateRoutes />} />
          <Route path="/operacoes" element={<PrivateRoutes />} />
        </Route>
      </Route>
    </Router>
  );
};

export default Routes;
