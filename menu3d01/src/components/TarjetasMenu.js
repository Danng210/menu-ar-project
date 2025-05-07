import { useNavigate,Link } from 'react-router-dom';
import React, {useEffect } from "react";
import { FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { useCarrito } from '../context/CarritoContext';

export default function TarjetasMenu({ productos, categoria }) {
const {
  cantidades,
  aumentarCantidad,
  disminuirCantidad,
  añadirAlCarrito
} = useCarrito();

const navigate = useNavigate();  

useEffect(() => {
  document.body.style.height = '';
  document.body.style.width = '';
  document.body.style.marginLeft = '';
  document.body.style.marginTop = '';
  
  window.dispatchEvent(new Event('resize'));
}, []);

return (
<section id="matriz-platillos">
  <div className="tarjeta-menu">
    {productos.length > 0 ? (
      productos.map(producto => (
        
        <div className="altura-regulable">
        <div className="producto-card" key={producto.ID_PRODUCTO}>            

        <Link
          to={`/menu/descripcion/${producto.NOMBRE_PRODUCTO}`}
          state={{ categoriaActual: categoria, modeloSeleccionado: producto.NOMBRE_PRODUCTO }}
        >
        <div id="img-mientras-tanto">
          <img id="foto-producto"
            src={`/api/${producto.URL_IMG_PRODUCTO}`}
            alt={producto.NOMBRE_PRODUCTO}
          />
        </div>

        <div id="texto">
            <p id="titulo-plato">{producto.NOMBRE_PRODUCTO}</p>
            <p id="precio-plato">${producto.PRECIO}</p>

        </div>
        </Link>

          <div className="container-botones" id="btn-en-tarjeta">
            <div className="spinner">
              <button className="boton-spiner" onClick={() => disminuirCantidad(producto.ID_PRODUCTO)}>
                <span><FiMinus /></span>
              </button>
              <span className="numero">{cantidades[producto.ID_PRODUCTO] || 1}</span>
              <button className="boton-spiner" onClick={() => aumentarCantidad(producto.ID_PRODUCTO)}>
                <span><FiPlus /></span>
              </button>
            </div>

            <button className="boton-añadir-carrito" onClick={() => añadirAlCarrito(producto)}>
              <span className="btn-carrito"><FiShoppingCart /></span>
            </button>
          </div>
        </div>
        </div>
      ))
    ) : (
      <p>No hay productos disponibles</p>
    )}
  </div>
</section>
);
}