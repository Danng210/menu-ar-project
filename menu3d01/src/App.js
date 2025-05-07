import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import DescripcionProducto from './components/DescripcionProducto';
import Pedido from './pages/Carrito';
import Factura from './pages/Factura';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu/:categoria" element={<Menu />} /> 
        <Route path="//menu/descripcion/:nombreProducto" element={<DescripcionProducto />} />
        <Route path='/pedido' element={<Pedido />} />
        <Route path='/factura' element={<Factura />} />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
