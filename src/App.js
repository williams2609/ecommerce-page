import BarraNavegacion from './componentes/BarraNavegacion';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Paginas/Home';
import Tienda from './Paginas/Tienda';
import Productos from './componentes/Productos';
import { ProductosProvider } from './componentes/ProductosProvider';
import Contacto from './Paginas/Contacto';


function App() {
  return (
    <div className="App">
      <Router>
       <BarraNavegacion/>
       <ProductosProvider>
        <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Tienda' element={<Tienda/>}/>
          <Route path='/Contacto' element={<Contacto/>}/>
          <Route path='/Tienda/:productId' element={<Productos/>}/>
        </Routes>
      </ProductosProvider>
      </Router>
    </div>
  );
}

export default App;
