import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError("");

    try {
      const success = login(username, password);

      if (success) {
        navigate("/tasks");
      } else {
        setError(
          'Credenciales incorrectas. Prueba con usuario: "admin" y contraseña: "1234"'
        );
      }
    } catch (err) {
      console.log(err);
      setError("Ha ocurrido un error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su usuario"
            disabled={isSubmitting}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            disabled={isSubmitting}
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="login-button"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Ingresar
        </Button>
      </form>

      <div className="demo-credentials">
        <p>Para acceder utiliza:</p>
        <p>
          Usuario: <strong>admin</strong>
        </p>
        <p>
          Contraseña: <strong>1234</strong>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
