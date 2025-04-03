import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Task Manager" }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container header-content">
        <h1 className="header-title">{title}</h1>

        {isAuthenticated && (
          <div className="user-info">
            <span>¡Hola, {user.username}!</span>
            <Button variant="secondary" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
