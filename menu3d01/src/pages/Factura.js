import React, { useEffect, useState } from 'react';
import { FiChevronLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';
import '../styles/factura.css';

export default function Factura() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [numeroPedidoHoy, setNumeroPedidoHoy] = useState(0);
  const [pedidosHoy, setPedidosHoy] = useState([]);
  const [abierto, setAbierto] = useState(false);

  const idPedido = localStorage.getItem('ultimoPedido'); // Debes guardar esto al hacer el pedido

  useEffect(() => {
    if (!idPedido) return;

    const fetchFactura = async () => {
      try {
        const res = await fetch(`/api/obtener_factura.php?id_pedido=${idPedido}`);
        const data = await res.json();
        
        // console.log(data.productos);

        if (data.success) {
          setProductos(data.productos); // [{ nombre, cantidad, subtotal }]
          setTotal(data.total); // número
          setNumeroPedidoHoy(data.numeroPedidoHoy); // 3
          const lista = Array.from({ length: data.numeroPedidoHoy }, (_, i) => i + 1);
          setPedidosHoy(lista);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchFactura();
  }, [idPedido]);

  const propina = (total * 0.10).toFixed(0);


  return (
    <div className="app-container-factura">
      <div className="everything-factura">
        <div className="head-container-factura">
        <Link to="/" className="back-button">
        <FiChevronLeft />
        </Link>
          <h1 className="titulo">Pedido</h1>
          <span className="n_pedido">{numeroPedidoHoy}</span>
        </div>

        <div className="rect_gris">
        {productos.map((p, index) => {
          console.log("Producto:", p); // 👈 Esto te dirá si viene el subtotal o no

          return (
            <div className="items" key={index}>
              <p id="grupo">{p.nombre}</p>
              {/* <p>{p.cantidad}</p> */}
              <p>${Number(p.subtotal).toLocaleString()}</p>
            </div>
          );
        })}

          <div id="total">
            <p className="f_total"><b></b>Total</p>
            <p className="f_total">${parseInt(total).toLocaleString()}</p>
          </div>
        </div>

        <h2>Propina sugerida</h2>
        <div className="rect_gris">
          <p>${parseInt(propina).toLocaleString()}</p>
        </div>

        <div className="desplegable-container">
          <div className="desplegable-titulo" onClick={() => setAbierto(!abierto)}>
            <span className="flecha">{abierto ? "▾" : "▸"}</span>
            <span>Pedidos en cola</span>
          </div>
          {abierto && (
            <ul className="lista">
              {pedidosHoy.map(n => (
                <li
                  key={n}
                  className={`desplegable-item ${n === numeroPedidoHoy ? 'actual' : ''}`}
                  id={n === numeroPedidoHoy ? 'pedido-actual' : ''}
                >
                  Pedido {n}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}