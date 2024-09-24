import React, { useState } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';

function CrearUsuario() {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
  });

  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    // Reset error message when typing
    if (name === 'confirmPassword') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Reset error message
    setError('');

    // Validate form
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setValidated(true);
    } else {
      setValidated(false);
      setSubmitted(true);
      // Aquí puedes agregar lógica para enviar los datos a un servidor
      console.log('Usuario creado:', inputValue);

      // Resetear el formulario
      setInputValue({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
      });
    }
  };

  return (
    <div>
      <div className='container mt-5 d-flex justify-content-center align-items-center' style={{ flexDirection: 'column' }}>
        <h2>Crear Usuario</h2>
        <div style={{ width: '100%' }} className='row d-flex align-items-center justify-content-center mt-4'>
          <Card className='col-12 col-lg-5 text-center'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  className='mb-3'
                  name='name'
                  required
                  value={inputValue.name}
                  type='text'
                  onChange={handleInput}
                  placeholder='Ingrese su Nombre'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className='mb-3'
                  required
                  name='email'
                  value={inputValue.email}
                  type='email'
                  onChange={handleInput}
                  placeholder='Ingrese su Email'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  className='mb-3'
                  required
                  name='password'
                  value={inputValue.password}
                  type='password'
                  onChange={handleInput}
                  placeholder='Ingrese su Contraseña'
                />
                <Form.Control.Feedback type='invalid'>
                  Debe ingresar la contraseña.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control
                  required
                  className='mb-3'
                  name='confirmPassword'
                  value={inputValue.confirmPassword}
                  type='password'
                  onChange={handleInput}
                  placeholder='Confirme su Contraseña'
                  isInvalid={validated && inputValue.password !== inputValue.confirmPassword} // Check for mismatch
                />
                <Form.Control.Feedback type='invalid'>
                  {error || 'La contraseña no coincide.'}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  className='mb-3'
                  name='number'
                  value={inputValue.number}
                  type='tel'
                  onChange={handleInput}
                  placeholder='Ingrese su Número de Teléfono'
                  pattern='[0-9]{10}' // Ajustar el patrón según el formato deseado
                />
                <Form.Control.Feedback type='invalid'>
                  Ingrese un número de teléfono válido (10 dígitos).
                </Form.Control.Feedback>
              </Form.Group>
              <Button className='mb-4' type='submit'>
                Confirmar
              </Button>
            </Form>
            {submitted && <Alert variant='success'>Usuario creado exitosamente!</Alert>}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;