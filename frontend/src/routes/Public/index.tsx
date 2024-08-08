import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

const PublicRoutes: React.FC = () => {
  return (
    <Router>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
    </Router>
  );
};

export default PublicRoutes;
