import React from 'react'
import {Link} from 'react-router-dom'
import icono from '../imagenes/icono.png'
import '../estilos/barra.css'
import { auth } from './FireBaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState, useContext } from 'react';
import { Button, Card } from 'react-bootstrap'
import ProductosContext from './ProductosProvider';

function BarraNavegacion() {
  const [user, setUser] = useState(null); // Estado para el usuario
  const [showCart, setShowCart] = useState(false)

  const {carrito ,removeFromCart, sumarCantidad,restarCantidad} = useContext(ProductosContext) || []

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Si el usuario está autenticado, establece el estado
      } else {
        setUser(null); // Si no, establece el estado a null
      }
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
  }, []);

 const handleRemoveFromCart =(productoID) =>{
  removeFromCart(productoID)
 }
   const handleSumar = (itemId)=>{
    sumarCantidad(itemId)
   } 
   const handleRestar = (itemId)=>{
    restarCantidad(itemId)
   }
  return (
    <div className='contenedor-nav container-fluid'>
      <div className='navBar d-flex align-items-center justify-content-between row'>
        <Link to="/" className='col-md-3 col-xs-12 contenedor-icono'><img src={icono} className='icono-nav'></img></Link>
          <div className='contenedor-links d-flex text-center justify-content-between col-12 col-xs-4 col-lg-3 col-md-4'>
            <Link to="/" className='link'>Inicio</Link>
            <Link to="/Tienda" className='link'>Tienda</Link>
            <Link to="/Contacto" className='link'>Contacto</Link>
          </div>
          <div className='contenedor-sesion d-flex align-items-center justify-content-end col-md-3 col-xs-12'>
            {user === null &&
            <Link to="/Login" className='link'>Login</Link>}
            <Link to="/Perfil" className='link'>Perfil</Link>
            
            <div className='contenedor-carrito'>
             <Button className='boton-carrito' onClick={()=> setShowCart(!showCart)}> 
              <i className="icono-nav bi bi-cart3">Carrito</i>
              </Button>
              {showCart && 
              <div className='col-5 col-md-3 col-lg-3 col-xl-2 carrito-compras'>
                <div className='d-flex text-center'>
                {carrito.length > 0 ? 
                (<div className='container'>
                  <h3>Productos en el Carrito</h3>
                  {carrito.map((producto,index)=>(
                 
                 <Card key={index} className='mt-2 d-flex align-items-center text-center'>
                    <img src={producto.thumbnail}style={{width:"10vw"}}></img>
                   <div className='d-flex text-center justify-content-center' style={{flexDirection:"column"}}> 
                    <p className='p-carrito'>€ {producto.price}</p>
                  <div className='mb-4 d-flex text-center align-items-center justify-content-center'>
                  <i class="bi bi-plus m-1" onClick={()=>handleSumar(producto.id)}></i>
                    <p className='m-0'>{producto.quantity}</p>
                  <i class="bi bi-dash m-1" onClick={()=>handleRestar(producto.id)}></i>
                    </div>
                    </div>

                    <Button className="boton-remover btn-danger" 
                    onClick={()=>handleRemoveFromCart(producto.id)}>Eliminar</Button>
                  </Card>
                ))}
                </div>)
                :
                (<h2>No hay Articulos en su carrito</h2>)}
                </div>
                
                </div>}
            </div>

          </div>
      </div>
      
    </div>
  )
}

export default BarraNavegacion