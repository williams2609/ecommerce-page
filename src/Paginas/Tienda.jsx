
import '../estilos/tienda.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import ProductosContext from '../componentes/ProductosProvider';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
function Tienda() {

const navigate = useNavigate()

const {products,error} = useContext(ProductosContext)
const [selectedCategory,setSelectedCategory] = useState("")
const [currentPage,setCurrentPage] = useState(1)
const [minMaxPrice,setMinMaxPrice] = useState([0,50000])
const [tempMinMax , setTempMinMax] = useState([0,50000])
const [filtros,setFiltros] = useState(false)
const [searchValue,setSearchValue] = useState("")

const productsPerPage = 20

   const categories = [...new Set(products.map(product => product.category))]

   const filteredByCategory = selectedCategory ? 
   products.filter(product => product.category === selectedCategory):
   products

  const filteredProducts = filteredByCategory.filter(product=>{
    const price = product.price
    const [minPrice , maxPrice] = minMaxPrice
    return price >= minPrice && price <= maxPrice && 
    product.title.toLowerCase().includes(searchValue.toLowerCase())
});

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

const totalPage = Math.ceil(filteredProducts.length / productsPerPage)

const paginate = (pageNumber) =>{
  setCurrentPage(pageNumber)
} 

console.log(categories)

const handleNavigate = (product)=>{
  navigate(`/Tienda/${product.id}`, {state: product})
}

const handleMaxmin = (index, value) => {
  let newMinMaxPrice = [...tempMinMax];
  const parsedValue = parseFloat(value);
  
  if (index === 0 && parsedValue <= newMinMaxPrice[1]) {
    newMinMaxPrice[0] = parsedValue;
  } else if (index === 1 && parsedValue >= newMinMaxPrice[0]) {
    newMinMaxPrice[1] = parsedValue;
  }

  setTempMinMax(newMinMaxPrice);
};

const handleSelectedCategory = (e)=>{
  setSelectedCategory(e.target.value)
  setCurrentPage(1)
}

const handleClick = ()=>{
  setMinMaxPrice(tempMinMax)
}

const handleFilters = ()=>{
    setFiltros(!filtros)
}

  return (
<div className='contenedor-productos'>
  {error && <p>{error}</p>}
  
  <div className="navbar bg-light p-3">
    <h3 className="navbar-brand titulo">Tienda</h3>
    <form className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar producto"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)} // Actualiza el estado de búsqueda
      />
      <button type="button" className="btn btn-outline-success">
        Buscar
      </button>
    </form>
  </div>
  
  <div className='d-flex justify-content-center text-center'>
    <h3 className='filtros f' onClick={handleFilters}>Usar Filtros</h3>
  </div>

  {filtros && (
    <>
      <div className='container d-flex justify-content-between'>
        <div className='d-flex align-items-center contenedor-categoria'>
          <h4 className='filtros'>Categoría</h4>
          <select 
            className="selector-categoria" 
            value={selectedCategory} 
            onChange={handleSelectedCategory}
          >
            <option value="">Todas las Categorías</option>
            {categories.map((categoria, index) => (
              <option 
                style={{ backgroundColor: "rgb(102, 0, 128)", color: "white" }} 
                key={index}
              >
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div className='text-center'>
          <h4 className='filtros'>Filtro Precio</h4>
          <div className='d-flex justify-content-center'>
            <label>Precio Mínimo </label>
            <input
              className='input-rango'
              min="0"
              max="50000"
              step="10"
              type='range' 
              value={tempMinMax[0]}
              onChange={e => handleMaxmin(0, e.target.value)}
            />
            <label>€{tempMinMax[0]}</label>
          </div>
          <div className='contenedor-filtro-precio d-flex justify-content-center'>
            <div>
              <label>Precio Máximo</label>
              <input
                className='input-rango'
                min="0"
                max="50000"
                type='range' 
                step="10"
                value={tempMinMax[1]}
                onChange={e => handleMaxmin(1, e.target.value)}
              />
              <label>€{tempMinMax[1]}</label> 
            </div>    
            <div>
              <Button className='btn boton-precio' onClick={handleClick}>
                Filtrar Precio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )}
  
  <div className='container-fluid'>
    <div className='contenedor-cartas row d-flex align-items-center justify-content-center'>
      {products && 
        currentProducts.map((product, index) => (
          <Card 
            key={index} 
            className='col-9 col-sm-6 col-md-4 col-lg-3 col-xl-2 carta-productos d-flex justify-content-center align-items-center mb-4'
          >
            <Card.Img 
              src={product.thumbnail} 
              alt={product.title} 
              className='Img justify-content-center d-flex' 
            />
            <Card.Body className='body'>
              <Card.Title className=''>{product.title}</Card.Title>
              <Card.Text className='text-center'>
                ${product.price} 
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item className='d-flex justify-content-between'>Categoría <p>{product.category}</p></ListGroup.Item>
              <ListGroup.Item className='d-flex justify-content-between'>Stock: <p>{product.stock}</p></ListGroup.Item>
              <ListGroup.Item className='discount d-flex align-items-center text-center justify-content-between '>Descuento <p className='btn btn-warning d-flex info-descuento'>{product.discountPercentage}%</p></ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link className='btn btn-primary link-carta' onClick={() => { handleNavigate(product) }}>
                Card Link
              </Card.Link>
            </Card.Body>
          </Card>
        ))
      }
    </div>

    <div className='d-flex justify-content-center align-items-center row'>
      <Pagination className="col-12">
        <Pagination.First onClick={() => paginate(1)} />
        {currentPage !== 1 && <Pagination.Prev onClick={() => paginate(currentPage - 1)} />}
        <Pagination.Item>{currentPage}</Pagination.Item>
        {[...Array(totalPage).keys()].map(pageNumber => (
         
         <Pagination.Item 
            key={pageNumber + 1} 
            active={currentPage === pageNumber + 1} 
            onClick={() => paginate(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
        {currentPage !== totalPage && <Pagination.Next onClick={() => paginate(currentPage + 1)} />}
        <Pagination.Last onClick={() => paginate(totalPage)} />
      </Pagination>
    </div>
  </div>
</div>
  )
}

export default Tienda