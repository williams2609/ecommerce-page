import React, { useState } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { auth, db } from '../componentes/FireBaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

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
  
 const navigate = useNavigate()

  const registerUser = async (email, password, name, number) => {
    try {
        // Crear un nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Actualizar el perfil del usuario
        await updateProfile(user, {
            displayName: name
        });

        // Guardar información adicional en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            name: name,
            email: email,
            number: number,
        });

        console.log('Usuario registrado:', user);
        setSubmitted(true);
        setTimeout(()=>{
          navigate('/')
        },1000)
        setError('');
    } catch (error) {
        setError(`Error ${error.code}: ${error.message}`);
        console.error('Error al registrar:', error.code, error.message);
        setSubmitted(false);
    }
};

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (name === 'confirmPassword') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setError('');

    if (form.checkValidity() === false) {
      setValidated(false);
    } else if (inputValue.password !== inputValue.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setValidated(false);
    } else {
      setValidated(false);
      registerUser(inputValue.email, inputValue.password, inputValue.name, inputValue.number);
      
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
                  isInvalid={validated && inputValue.password !== inputValue.confirmPassword}
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
                  pattern='[0-9]{9}'
                />
                <Form.Control.Feedback type='invalid'>
                  Ingrese un número de teléfono válido (9 dígitos).
                </Form.Control.Feedback>
              </Form.Group>
              <Button className='mb-4' type='submit'>
                Confirmar
              </Button>
            </Form>
            {submitted && <Alert variant='success'>Usuario creado exitosamente!</Alert>}
            {error && <Alert variant='danger'>{error}</Alert>}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;