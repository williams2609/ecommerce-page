import React, { useState } from 'react'
import { Button,Form,Alert,Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate()

    const [formValue, setFormValue] = useState({
    userName: '',
    contraseña: '',
  });
  const [login, setLogin] = useState(false);
  const [validated, setValidated] = useState(false); // Para manejar la validación


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

const handleNavigate =()=>{
  navigate('/crear-cuenta')

}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validación simple para asegurarse que los campos no estén vacíos
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLogin(true); // Se establece el estado de login exitoso si la validación pasa
    }
    setValidated(true); // Establece el estado de validación para mostrar mensajes
  };

  console.log(formValue);

  return (
    <div className="contenedor-login container">
      <div className="row d-flex align-items-center justify-content-center mt-5 text-center flex-column">
        <h2>Iniciar Sesión</h2>
        <Card
          className="d-flex text-center mt-5 p-3 col-12 justify-content-center align-items-center"
          style={{ width: '500px' }}
        >
          <Form noValidate validated={validated} className="container" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label>Nombre De Usuario</Form.Label>
              <Form.Control
                required
                value={formValue.userName}
                type="text"
                placeholder="Ingresa el nombre de usuario"
                name="userName"
                onChange={handleInput}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu nombre de usuario.
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

        {/* Mostrar mensaje solo si login es exitoso */}
        {login && validated && (
          <Alert variant="success" className="mt-3">
            ¡Inicio de sesión completado!
          </Alert>
        )}
      </div>
    </div>
  )
}

export default Login