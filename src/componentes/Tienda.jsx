
import '../estilos/tienda.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductosContext from './ProductosProvider';

function Tienda() {

const navigate = useNavigate()

const {products,error} = useContext(ProductosContext)
const [selectedCategory, setSelectedCategory] = useState('');

   const categorias = [new Set(products.map(producto => producto.category))]

   const filteredProducts = selectedCategory ? 
   products.filter(product => product.category === selectedCategory):
   products

const handleNavigate = (product)=>{
  navigate(`/Tienda/${product.id}`, {state: product})
}


  return (
    <div className='contenedor-productos'>
          {error && <p>{error}</p>}

          <div className='contenedor-titulo d-flex align-items-center justify-content-center m-5'>
              <h1 className='titulo'>Nuestros Productos</h1>

          </div>
          <h3>filtrar Productos</h3>
          <select>
            {categorias.map(( category,index )=>(
              <option key={index}>{category}</option>
            ))}
          </select>
          <div className='container-fluid'>
                <div className='contenedor-cartas row d-flex  align-items-center justify-content-center'>
                    {products && 
                    products.map((product,index)=>(
              
                        <Card key={index} className='col-7 col-sm-4 col-md-4 col-lg-4 col-xl-2 carta-productos d-flex justify-content-center align-items-center'>
                          <Card.Img src={product.thumbnail} alt={product.title} className='Img justify-content-center d-flex' />
                          <Card.Body className='body'>
                              <Card.Title className=''>{product.title}</Card.Title>
                              <Card.Text className='text-center'>
                                ${product.price} 
                              </Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                              <ListGroup.Item className='d-flex justify-content-between'>Categoria <p>{product.category}</p></ListGroup.Item>
                              <ListGroup.Item className='d-flex justify-content-between'>Stock: <p>{product.stock}</p></ListGroup.Item>
                              <ListGroup.Item className='discount d-flex align-items-center text-center justify-content-between '>Discount <p className='btn btn-warning d-flex info-descuento'>{product.discountPercentage}%</p></ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Card.Link className='btn btn-primary link-carta' onClick={()=>{handleNavigate(product)}}>Card Link</Card.Link>
                            
                          </Card.Body>
                      </Card>

                    ))
                    }
                </div>
            </div>

    </div>
  )
}

export default Tienda