import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import FirstAccess from "@/pages/Auth/FirstAccess";
import ResetPassword from "@/pages/Auth/ResetPassword";

const PublicRoutes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route path="/primeiro-acesso" element={<FirstAccess />} />
      <Route path="/resetar-senha" element={<ResetPassword />} />
    </Router>
  );
};

export default PublicRoutes;
