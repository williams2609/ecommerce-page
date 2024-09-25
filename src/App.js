import BarraNavegacion from './componentes/BarraNavegacion';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Paginas/Home';
import Tienda from './Paginas/Tienda';
import Productos from './componentes/Productos';
import { ProductosProvider } from './componentes/ProductosProvider';
import Contacto from './Paginas/Contacto';
import Login from './Paginas/Login.tsx';
import CrearUsuario from './Paginas/CrearUsuario.jsx';
import Profile from './Paginas/Profile.jsx';


function App() {
  return (
    <div className="App">
      <Router>
       <BarraNavegacion/>
       <ProductosProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Tienda' element={<Tienda/>}/>
          <Route path='/Contacto' element={<Contacto/>}/>
          <Route path='/Tienda/:productId' element={<Productos/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/crear-cuenta' element={<CrearUsuario/>}/>
          <Route path='/perfil' element={<Profile/>}/>
        </Routes>
      </ProductosProvider>
      </Router>
    </div>
  );
}

export default App;
