import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ResetPassword from "@/pages/Auth/ResetPassword";

const PublicRoutes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/resetar-senha" element={<ResetPassword />} />
    </Router>
  );
};

export default PublicRoutes;
