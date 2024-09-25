import React, { useEffect, useState } from 'react';
import { Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { auth } from '../componentes/FireBaseConfig'; // Asegúrate de importar tu configuración de Firebase
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../estilos/Profile.css'; // Asegúrate de crear un archivo CSS para estilos adicionales

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserData({
        email: user.email,
        displayName: user.displayName || 'No disponible',
        photoURL: user.photoURL || 'https://via.placeholder.com/150', // Placeholder si no hay imagen
      });
    } else {
      setError('Usuario no autenticado. Redirigiendo a inicio de sesión...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      setError(`Error al cerrar sesión: ${error.message}`);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center shadow-lg">
            <Card.Header>
              <h3>Perfil de Usuario</h3>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {userData ? (
                <>
                  <img
                    src={userData.photoURL}
                    alt="User Avatar"
                    className="avatar"
                  />
                  <Card.Text className="mt-3">
                    <strong>Nombre:</strong> {userData.displayName}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {userData.email}
                  </Card.Text>
                  <Button variant="primary" onClick={handleLogout} className="logout-button">
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <p>Cargando datos del usuario...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;