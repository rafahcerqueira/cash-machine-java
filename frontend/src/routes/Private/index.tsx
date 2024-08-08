import React from "react";
import { Route, Routes as Router } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Operations from "@/pages/Operations";
import Extract from "@/pages/Extract";

const PrivateRoutes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<Dashboard />} />
      <Route path="/extrato" element={<Extract />} />
      <Route path="/operacoes" element={<Operations />} />
    </Router>
  );
};

export default PrivateRoutes;
