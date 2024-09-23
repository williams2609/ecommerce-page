import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaStar } from 'react-icons/fa';
import '../estilos/productos.css';
import { Card } from 'react-bootstrap';
import ProductosContext from './ProductosProvider';

function Productos() {
    const { productId } = useParams()  
    const products = useContext(ProductosContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // Estado para almacenar el producto

    const productos = products.products
    useEffect(()=>{
      if(Array.isArray(productos)){
         const foundProducts = productos.find(p => p.id === parseInt(productId))
         setProduct(foundProducts) 
      }
    },[productId, productos])

    // Manejo básico de errores
    if (!product) {
        return <p>Producto no encontrado.</p>;
    }

    const handleNavigate = (relatedProductId) => {
        navigate(`/Tienda/${relatedProductId}`);
    };

    const relatedProducts = productos.filter(p => p.category === product.category && p.id !== product.id);

    return (
        <div className='contenedor-pagina-productos container-fluid'>
            <div className='contenedor-producto row mt-5 d-flex'>
                <div className='contenedor-imagenn col-md-5 d-flex align-items-center justify-content-center'>
                    <img src={product.thumbnail} alt={product.title} />
                </div>

                <div className='col-md-6'>
                    <h1 className='titulo-p mt-2'>{product.title}</h1>
                    <div className='product-rating'>
                        {Array(Math.round(product.rating))
                            .fill(0)
                            .map((_, i) => (
                                <FaStar key={i} style={{ color: "#FFD700" }} />
                            ))
                        }
                        <p>Rating: {product.rating}</p>
                    </div>
                    
                    <h2 className='product-price'>€{product.price}</h2>
                    <p className='product-stock'>
                        {product.stock > 0 ? (
                            <span className='text-warning'><strong>En Stock </strong>{product.stock}</span>
                        ) : (<span className='text-danger'>Agotado</span>)}
                    </p>
                    <p className='product-discount'>
                        <strong>Descuento</strong>
                        <span className='text-warning'>{product.discountPercentage}% OFF</span>
                    </p>
                    <p className='product-description'>{product.description}</p>
                    <div className='contenedor-botoness d-flex align-items-center justify-content-center'>
                        <Button variant="warning col-9 col-md-6">Comprar ahora</Button>
                        <Button className='primary col-9 mt-2 col-md-6 botonAñadir'>Añadir Al Carrito</Button>
                    </div>
                </div>
            </div>

            <div className='container-fluid mt-4 card'>
                <strong className='mt-3'>Caracteristicas</strong>
                <p><b>Descripcion: </b>{product.description}</p>
                <p><b>Categoria: </b>{product.category}</p>
                <p><b>Dimensiones: </b><b>Ancho: </b>{product.dimensions.width} <b>Alto: </b>{product.dimensions.height} <b>Profundidad: </b>{product.dimensions.depth}</p>
                <p><b>Politica de Devoluciones: </b>{product.returnPolicy}</p>
            </div>

            <div className='Comentarios mt-4 mb-3'>
                <strong>Comentarios</strong>
                {product.reviews.map((rev, index) => (
                    <div className='card p-3' key={index}>
                        <p><b>Nombre: </b> {rev.reviewerName}</p>
                        <p><b>Comentario: </b>{rev.comment}</p>
                        <div>
                            {Array(Math.round(rev.rating)).fill(0)
                                .map((_, i) => (
                                    <FaStar key={i} style={{ color: "#FFD700" }} />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div className='contenedor-productosR row overflow-auto container-fluid'>
                <strong className='mb-3'>Productos Relacionados</strong>
                <div className='d-flex align-items-center justify-content-center contenedor-t mb-4'>
                    {relatedProducts.slice(0, 4).map((producto) => (
                        <div className='contenedor-tarjetas col-12 col-sm-6 col-md-4 col-lg-2 m-1' key={producto.id}>
                            <Card className='d-flex align-items-center justify-content-center'>
                                <img src={producto.thumbnail} style={{ width: "110px" }} alt={producto.title} />
                                <p>Precio: €{producto.price}</p>
                                <p className='text-warning'><b>Descuento:</b> {producto.discountPercentage}% OFF</p>
                                <Button 
                                    className='btn btn-warning mb-3'
                                    onClick={() => handleNavigate(producto.id)}
                                >
                                    Ver Producto
                                </Button>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Productos;