import { useState, useEffect, createContext } from 'react';

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Cargar productos desde la API
  useEffect(() => {
    const productsFetch = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=200");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error);
      }
    };
    productsFetch();
  }, []);

  // Cargar carrito desde localStorage cuando la página se carga
  useEffect(() => {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      setCarrito(JSON.parse(savedCart)); // Actualiza el estado con los productos guardados
    }
  }, []);  // Este efecto solo se ejecuta una vez cuando el componente se monta

  // Guardar el carrito en localStorage cuando cambia el carrito
  useEffect(() => {
    if (carrito.length > 0) { // Guarda solo si hay productos en el carrito
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito]);  // Este efecto se ejecuta cada vez que el carrito cambie

  const addToCart = (product) => {
    setCarrito((prevCart) => {
      const itsInCart = prevCart.find((item) => item.id === product.id);
      if (itsInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCarrito((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const sumarCantidad = (productId) => {
    setCarrito((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const restarCantidad = (productId) => {
    setCarrito((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <ProductosContext.Provider
      value={{ restarCantidad, sumarCantidad, products, error, addToCart, carrito, removeFromCart }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductosContext;