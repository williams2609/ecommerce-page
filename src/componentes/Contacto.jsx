import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function Contacto() {

  const[formData , setFormData] = useState({
    name:"",
    email: "",
    phone: "",

  })
  const [validated,setValidated] = useState(false)
  const [submitted,setSubmitted] = useState(false)


  const handleSubmit = (e)=>{
    const form = e.currentTarget;
    e.preventDefault()
  
    if(form.checkValidity() === false ){
      setValidated(true)

    }
    else{
      setValidated(false)
      setSubmitted(true)
      
    }

  }
  
  const handleInputChange = (e)=>{
    const {name,value}= e.target
    setFormData(
      {
      ...formData,
      [name]: value
    }
  )
  }
  return (
    
    

    <Container className="my-5">
  <h1 className="text-center mb-4">Contáctanos</h1>
  
  {submitted && (
    <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
      ¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.
    </Alert>
  )}
  
  <Row>
    <Col md={6}>
      <h3>¡Ponte en contacto!</h3>
      <p>Nos encantaría saber de ti. Por favor, completa el formulario a continuación y nos pondremos en contacto lo antes posible.</p>
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingresa tu nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, proporciona tu nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Ingresa tu correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, proporciona una dirección de correo válida.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone" className="mb-3">
          <Form.Label>Número de teléfono</Form.Label>
          <Form.Control
            required
            type="tel"
            placeholder="Ingresa tu número de teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, proporciona tu número de teléfono.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={5}
            placeholder="Ingresa tu mensaje"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa tu mensaje.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Col>

    <Col md={6}>
      <h3>Información de contacto</h3>
      <p className="mb-1"><strong>Dirección:</strong> 1234 Nombre de la Calle, Ciudad, País</p>
      <p className="mb-1"><strong>Teléfono:</strong> +1 234 567 890</p>
      <p className="mb-1"><strong>Correo:</strong> contacto@empresa.com</p>
      
      <h3 className="mt-4">Síguenos</h3>
      <div className="d-flex justify-content-start">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="me-3">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
    </Col>
  </Row>
</Container>

)
}

export default Contacto