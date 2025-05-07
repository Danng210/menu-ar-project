// context/CarritoContext.js
import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [preferencias, setPreferencias] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [pedidoRealizado, setPedidoRealizado] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMensaje, setToastMensaje] = useState('');

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const aumentarCantidad = (idProducto) => {
    setCantidades(prev => ({
      ...prev,
      [idProducto]: (prev[idProducto] || 1) + 1
    }));
  };

  const disminuirCantidad = (idProducto) => {
    setCantidades(prev => ({
      ...prev,
      [idProducto]: Math.max((prev[idProducto] || 1) - 1, 1)
    }));
  };

  const añadirAlCarrito = (producto) => {
    const cantidad = cantidades[producto.ID_PRODUCTO] || 1;
    const existe = carrito.find(item => item.id === producto.ID_PRODUCTO);

    if (existe) {
      setCarrito(prev =>
        prev.map(item =>
          item.id === producto.ID_PRODUCTO
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
                subtotal: (item.cantidad + cantidad) * item.precio_unidad
              }
            : item
        )
      );
    } else {
      setCarrito(prev => [
        ...prev,
        {
          id: producto.ID_PRODUCTO,
          nombre: producto.NOMBRE_PRODUCTO,
          cantidad,
          precio_unidad: parseFloat(producto.PRECIO),
          subtotal: parseFloat(producto.PRECIO) * cantidad
        }
      ]);
    }

    mostrarToast('Producto añadido al carrito');
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito(prev => prev.filter(item => item.id !== idProducto));
    mostrarToast('Producto eliminado del carrito');
  };

  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  const realizarPedido = async () => {
    if (carrito.length === 0) {
      mostrarToast('El carrito está vacío');
      return false;
    }
    if (!metodoPago) {
      mostrarToast('Debe seleccionar un método de pago');
      return false;
    }

    try {
      const response = await fetch('/api/realizar_pedido.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito, preferencias, metodo_pago: metodoPago, total })
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem('ultimoPedido', result.id_pedido);
        mostrarToast('Pedido realizado exitosamente');
        setCarrito([]);
        setCantidades({});
        setPreferencias('');
        setMetodoPago('');
        setPedidoRealizado(true);
        return true;
      } else {
        mostrarToast('Error al realizar el pedido: ' + result.message);
        return false;
      }
    } catch (error) {
      console.error('Error al enviar el pedido:', error);
      mostrarToast('Error de red al realizar el pedido');
      return false;
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        cantidades,
        preferencias,
        metodoPago,
        total,
        setPreferencias,
        setMetodoPago,
        aumentarCantidad,
        disminuirCantidad,
        añadirAlCarrito,
        eliminarDelCarrito,
        realizarPedido,
        mostrarToast,
        pedidoRealizado
      }}
    >
      {children}
      <Toast mensaje={toastMensaje} visible={toastVisible} />
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);