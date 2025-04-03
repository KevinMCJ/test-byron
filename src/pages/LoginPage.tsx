import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import "../assets/styles/login.css";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/tasks");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="text-center mb-4">
        <div className="login-logo">Task Manager</div>
        <p>Gestiona tus tareas de manera eficiente</p>
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
