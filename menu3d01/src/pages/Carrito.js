import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuHam from '../components/MenuHambuerguesa';
import { useCarrito } from '../context/CarritoContext';
import { FiChevronLeft, FiX } from "react-icons/fi";
import { GoTrash } from 'react-icons/go';
import { BsCashCoin } from "react-icons/bs";
import { GrCreditCard } from "react-icons/gr";
import ConfirmacionPedidoModal from '../components/ConfirmacionPedidoModal';
import '../styles/carrito.css';

export default function Carrito() {
  const {
    carrito,
    preferencias,
    setPreferencias,
    metodoPago,
    setMetodoPago,
    total,
    realizarPedido,
    eliminarDelCarrito,
    mostrarToast
  } = useCarrito();

  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (carrito.length === 0) {
      mostrarToast('El carrito está vacío');
      return;
    }

    if (!metodoPago) {
      mostrarToast('Debe seleccionar un método de pago');
      return;
    }

    setMostrarModal(true);
  };

  const handleConfirmar = async () => {
    const exito = await realizarPedido();
    if (exito) {
      navigate('/factura');
    }
  };

  const handleMetodoSeleccionado = (metodo) => {
    setMetodoPago(metodo);
  };

  return (
    <div className="contenedor-contenido">
      <MenuHam />

    <div className="head-container">
      <Link to="/menu/entradas" className="back-button">
        <FiChevronLeft />
      </Link>
      <h1>Carrito</h1>
    </div>

      {carrito.map((item) => (
        <div className="tarjeta-carrito" key={item.id}>
          <span id="n_txt">{item.cantidad}</span>
          <span id="producto">{item.nombre}</span>
          <span id="precio">${item.subtotal}</span>


          <button className="trash-button"
            onClick={() => eliminarDelCarrito(item.id)}
          >
            <GoTrash/>
          </button>
        </div>
      ))}

      <div className="pref-container">
        <label htmlFor="preferencias">¿Tienes alguna preferencia especial para tu pedido?</label>
        <textarea
            type="text"
            id="preferencias"
            value={preferencias}
            onChange={(e) => setPreferencias(e.target.value)}
            placeholder="Ejemplo: Sin cebolla, poco picante, etc."
            rows={4}
        />
      </div>

      <h2 id="total"><b>Total:</b> ${total}</h2>

      <div className="metodo_pago">
      <h2 id="metodo">Escoja método de pago</h2>

      <div className="metodos-pago">

      <span className="metodosagain">
      <button className='metodukos' id='metoduko1'
            key={"Efectivo"}
            onClick={() => handleMetodoSeleccionado("Efectivo")}
            style={{
              backgroundColor: metodoPago === "Efectivo" ? '#ccc' : 'white',
              border: '1px solid #aaa',
              margin: '0.5rem'
            }}
          >  <BsCashCoin />  
          </button>
          <span>Efectivo</span>
      </span>

        <span className="metodosagain">
        <button className='metodukos'
            key={"Tarjeta"}
            onClick={() => handleMetodoSeleccionado("Tarjeta")}
            style={{
              backgroundColor: metodoPago === "Tarjeta" ? '#ccc' : 'white',
              border: '1px solid #aaa',
              margin: '0.5rem'
            }}
          >  <GrCreditCard/>  
          </button>
          <span>Tarjeta</span>
        </span>

      </div>
      </div>

    <div className="pedido-conteiner">
      <button className="boton-realizar-pedido" onClick={handleClick}>
        <span>Realizar pedido</span>
      </button>
    </div>

      <ConfirmacionPedidoModal
        visible={mostrarModal}
        onConfirmar={() => {
          setMostrarModal(false);
          handleConfirmar();
        }}
        onCancelar={() => setMostrarModal(false)}
      />
    </div>
  );
}