import React from 'react'
import '../estilos/home.css'


function Home() {
  return (
    <div className='contenedor-home'>
    <div className='contenedor-titulo'>
        <h1>Marketplace</h1>
    </div>
      {/* Hero Section */}
      <section className="hero hero-container container-fluid">
        <div className="hero-content card text-center justify-content-center">
          <h1>Bienvenido a Nuestra Tienda</h1>
          <p>Encuentra los mejores productos al mejor precio</p>
          <a href="/Tienda" className="hero-btn btn btn-primary">Ver Productos</a>
        </div>
      </section>

         {/* Section of Features/Services */}
      <section className="features">
        <div className='row'>
          <div className="feature-item col-12 col-md-4">
          <h2>Envío rápido</h2>
          <p>Recibe tu pedido en 48/72 horas.</p>
        </div>
        <div className="feature-item col-12 col-md-4">
          <h2>Calidad Garantizada</h2>
          <p>Trabajamos solo con productos de primera calidad.</p>
        </div>
        <div className="feature-item col-12 col-md-4">
          <h2>Soporte 24/7</h2>
          <p>Estamos aquí para ayudarte en cualquier momento.</p>
        </div></div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Nuestra Tienda. Todos los derechos reservados.</p>
      </footer>
      
    </div>
  )
}

export default Home