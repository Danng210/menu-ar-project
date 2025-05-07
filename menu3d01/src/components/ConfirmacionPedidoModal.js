// components/ConfirmacionPedidoModal.js
import React from 'react';

export default function ConfirmacionPedidoModal({ visible, onConfirmar, onCancelar }) {
  if (!visible) return null;


  return (
    <div className="modal-overlay" id="confirmacion-pedido-overlay">

      <div className="modal-box" id="confirmacion-pedido-box">
        <h2 id="confirmacion-titulo">Confirmación de pedido</h2>
        <p id="confirmacion-mensaje">¿Desea ordenar?</p>

        <div className="botones-confirmacion">
          <button id="btn-salir" onClick={onCancelar}>Salir</button>
          <button id="btn-confirmar" onClick={onConfirmar}>Confirmar</button>
        </div>
        
      </div>
    </div>
  );
}
