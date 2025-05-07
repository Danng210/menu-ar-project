import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import {
  FiMenu, FiX
} from 'react-icons/fi';

function HamburgerMenu() {
  const { carrito, pedidoRealizado, mostrarToast } = useCarrito();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleClick = (ruta) => {
    if (ruta === "/pedido" && carrito.length === 0) {
      mostrarToast("Carrito de compra vacío");
      return;
    }

    if (ruta === "/factura") {
      if (carrito.length > 0 && !pedidoRealizado) {
        mostrarToast("Debes realizar el pedido para ver la factura");
        return;
      }
      if (carrito.length === 0 && !pedidoRealizado) {
        mostrarToast("Carrito de compra vacío");
        return;
      }
    }

    navigate(ruta);
    closeMenu();
  };

  return (
    <>
      <div className="hamburger-menu">
        <button className="hamburger-button" onClick={toggleMenu}>
          {isOpen ? <FiX id="icono-cerrar" /> : <FiMenu id="icono-menu" />}
        </button>
      </div>

      {isOpen && <div className="overlay" onClick={closeMenu}></div>}

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <h2 className={currentPath === "/" ? "active" : ""} onClick={() => handleClick("/")}>
            Inicio
          </h2>

          <h2 className={currentPath === "/menu/entradas" ? "active" : ""} onClick={() => handleClick("/menu/entradas")}>
            Menú
          </h2>

          <h2 className={currentPath === "/pedido" ? "active" : ""} onClick={() => handleClick("/pedido")}>
            Carrito
          </h2>

          <h2 className={currentPath === "/factura" ? "active" : ""} onClick={() => handleClick("/factura")}>
            Factura
          </h2>
        </ul>
      </div>
    </>
  );
}

export default HamburgerMenu;