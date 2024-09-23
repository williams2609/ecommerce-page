import { useState, useEffect, createContext } from 'react'


const ProductosContext = createContext()

export const ProductosProvider = ({children}) =>{

const [products, setProducts] = useState([])
const [error,setError] = useState(null)


useEffect(()=>{

const productsFetch = async ()=>{
    try{
        const response = await fetch("https://dummyjson.com/products?limit=200")
        const data = await response.json()
        setProducts(data.products)
    }catch(error){
        setError(error)
    }

}
  productsFetch()

},[])


  return (
    <ProductosContext.Provider value={{products,error}}>
        {children}
    </ProductosContext.Provider>
        
   
  )
}

export default ProductosContext