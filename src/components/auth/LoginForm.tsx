import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

interface LoginForm {
  username: string;
  password: string;
}

type FormErrors = Partial<LoginForm> & {
  general?: string;
};

const initialValues = {
  username: '',
  password: '',
};

const validate = (data: LoginForm): FormErrors => {
  const errors: FormErrors = {};

  if (!data.username.trim()) {
    errors.username = 'El usuario es requerido';
  }

  if (!data.password.trim()) {
    errors.password = 'La contraseña es requerida';
  }

  return errors;
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newData = {
      ...formData,
      [name]: value,
    };

    setFormData(newData);
    setErrors(validate(newData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitErrors = validate(formData);
    if (Object.keys(submitErrors).length > 0) {
      setErrors(submitErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = login(formData.username, formData.password);

      if (success) {
        navigate('/tasks');
      } else {
        setErrors({
          general:
            'Credenciales incorrectas. Prueba con usuario: "admin" y contraseña: "1234"',
        });
      }
    } catch (err) {
      setErrors({
        general: 'Oops... algo salió mal. Por favor, inténtelo más tarde',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingrese su usuario"
            disabled={isSubmitting}
            autoComplete="username"
          />
          {errors.username && (
            <div className="error-message">{errors.username}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese su contraseña"
            disabled={isSubmitting}
            autoComplete="current-password"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="login-button"
          isLoading={isSubmitting}
          disabled={isSubmitting || Object.keys(errors).length > 0}
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
