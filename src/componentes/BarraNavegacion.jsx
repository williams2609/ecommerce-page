import React from 'react'
import {Link} from 'react-router-dom'
import icono from '../imagenes/icono.png'
import '../estilos/barra.css'
function BarraNavegacion() {
  return (
    <div className='contenedor-nav'>
      <div className='container-fluid navBar d-flex align-items-center justify-content-between'>
        <Link to="/"><img src={icono} className='icono-nav'></img></Link>
          <div className='contenedor-links'>
            <Link to="/Inicio" className='link'>Inicio</Link>
            <Link to="/Tienda" className='link'>Tienda</Link>
            <Link to="/Contacto" className='link'>Contacto</Link>
          </div>
          <div className='contenedor-sesion'>
            <Link to="/Login" className='link'>Login</Link>
            <Link to="/Perfil" className='link'>Perfil</Link>
          </div>
      </div>
      
    </div>
  )
}

export default BarraNavegacion