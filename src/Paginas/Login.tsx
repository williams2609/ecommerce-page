import React, { useState } from 'react';
import { Button, Form, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth } from '../componentes/FireBaseConfig'; // Asegúrate de importar tu configuración de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    contraseña: '',
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        // Intentar iniciar sesión con email y contraseña
        await signInWithEmailAndPassword(auth, formValue.email, formValue.contraseña);
        setLoginSuccessful(true);
        setError('');

        // Mostrar mensaje de éxito
        setTimeout(() => {
          // Redirigir al usuario a la página de la tienda después de 2 segundos
          navigate('/tienda'); // Cambia esto a la ruta que desees
        }, 2000); // Esperar 2 segundos
      } catch (error) {
        setError(`Error ${error.code}: ${error.message}`);
        setLoginSuccessful(false);
      }
    }

    setValidated(true); // Establece el estado de validación para mostrar mensajes
  };

  return (
    <div className="contenedor-login container">
      <div className="row d-flex align-items-center justify-content-center mt-5 text-center flex-column">
        <h2>Iniciar Sesión</h2>
        <Card
          className="d-flex text-center mt-5 p-3 col-12 justify-content-center align-items-center"
          style={{ width: '500px' }}
        >
          <Form noValidate validated={validated} className="container" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={formValue.email}
                type="email"
                placeholder="Ingresa tu email"
                name="email"
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu email.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="contraseña">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                value={formValue.contraseña}
                type="password"
                placeholder="Ingresa la contraseña"
                name="contraseña"
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu contraseña.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="mt-4">
              Ingresar
            </Button>
            <Form.Group className='mt-3'>
              <a href='/crear-cuenta'>No tienes Cuenta aun?</a>
            </Form.Group>
          </Form>
        </Card>

        {/* Mostrar mensaje de éxito o error */}
        {loginSuccessful && validated && (
          <Alert variant="success" className="mt-3">
            ¡Sesion iniciada Correctamente! Redirigiendo a la tienda...
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Login;