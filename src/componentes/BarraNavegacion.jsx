import React from 'react'
import {Link} from 'react-router-dom'
import icono from '../imagenes/icono.png'
import '../estilos/barra.css'
function BarraNavegacion() {
  return (
    <div className='contenedor-nav container-fluid'>
      <div className='navBar d-flex align-items-center justify-content-between row'>
        <Link to="/" className='col-md-3 col-xs-12 contenedor-icono'><img src={icono} className='icono-nav'></img></Link>
          <div className='contenedor-links d-flex text-center justify-content-between col-12 col-xs-4 col-lg-3 col-md-4'>
            <Link to="/Home" className='link'>Inicio</Link>
            <Link to="/Tienda" className='link'>Tienda</Link>
            <Link to="/Contacto" className='link'>Contacto</Link>
          </div>
          <div className='contenedor-sesion d-flex align-items-center justify-content-end col-md-3 col-xs-12'>
            <Link to="/Login" className='link'>Login</Link>
            <Link to="/Perfil" className='link'>Perfil</Link>
            <div className='contenedor-carrito'>
              <i className="icono-nav bi bi-cart3">Carrito</i>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default BarraNavegacion