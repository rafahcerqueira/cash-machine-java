import React from "react";
import { Route, Routes as Router } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";

const PrivateRoutes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<Dashboard />} />
      <Route path="/extrato" element={<h1>Under development</h1>} />
      <Route path="/extrato/:id" element={<h1>Under development</h1>} />
      <Route path="/operacoes" element={<h1>Under development</h1>} />
    </Router>
  );
};

export default PrivateRoutes;
