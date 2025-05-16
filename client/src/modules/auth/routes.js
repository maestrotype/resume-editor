import React from "react";
import { Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";

const AuthRoutes = () => [
  <Route key="login" path="/login" element={<AuthForm isLogin />} />,
  <Route key="register" path="/register" element={<AuthForm />} />,
];

export default AuthRoutes;
