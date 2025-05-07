import { useRef, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiPlus, FiMinus, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import '../styles/arcamara.css';
import { useCarrito } from '../context/CarritoContext';


function formatearModelo(nombre) {
  return nombre.replaceAll(" ", "_");
}

export default function DescripcionProducto() {
  const streamRef = useRef(null);
  const videoContainerRef = useRef(null);  
  const [error, setError] = useState(null);
  const {
    carrito,
    cantidades,
    aumentarCantidad,
    disminuirCantidad,
    añadirAlCarrito,
  } = useCarrito();
  

  const { nombreProducto } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const categoria = location.state?.categoriaActual;
  const modeloSeleccionado = formatearModelo(location.state?.modeloSeleccionado || "Pollo");
  console.log(modeloSeleccionado);


  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const modelos = {
    Momos_al_vapor: "/modelos/momo.glb",
    Gyozas_de_Cerdo_y_Vegetales: "/modelos/gyozas.glb",
    Filete_Campo_Gourmet: "/modelos/carne.glb",
    Enchiladas_Norteñas_de_Res: "/modelos/Enchiladas.glb",
    Pollo_gratinado: "/modelos/pollo.glb",
    Spaghetti_en_Salsa_de_Tomate: "/modelos/tomato.glb",
    Naan_ChocoLovers: "/modelos/naan.glb",
    Rollo_de_Canela: "/modelos/canela.glb"
  };
  const escalas = {
    Momos_al_vapor: "25 25 25",
    Gyozas_de_Cerdo_y_Vegetales: "25 25 25",
    Filete_Campo_Gourmet: "2 2 2",
    Enchiladas_Norteñas_de_Res: "4 4 4",
    Pollo_gratinado: "3 3 3",
    Spaghetti_en_Salsa_de_Tomate: "1 1 1",
    Naan_ChocoLovers: "1 1 1",
    Rollo_de_Canela: "3 3 3"
  };

  const volverACategoria = () => {
    navigate(`/menu/${categoria}`);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await fetch(`/api/detalle_producto.php?nombre=${encodeURIComponent(nombreProducto)}`);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(() => {
      const sceneEl = document.querySelector('a-scene');
      if (sceneEl && sceneEl.systems && sceneEl.systems.arjs) {
        const arSystem = sceneEl.systems.arjs;
        const video = document.querySelector('video');
        if (video && video.srcObject) {
          streamRef.current = video.srcObject;
          if (videoContainerRef.current && !videoContainerRef.current.contains(video)) {
            videoContainerRef.current.appendChild(video);
            Object.assign(video.style, {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: '0',
              left: '0'
            });
          }
          console.log("✅ Cámara activada");
          clearInterval(interval);
        }
      }
    }, 500);

    obtenerProducto();

    return () => {
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        console.log("Cámara apagada");
      }

      const video = document.querySelector('video');
      if (video && video.parentNode) {
        video.parentNode.removeChild(video);
        console.log("Video eliminado");
      }
    };
  }, [nombreProducto, modeloSeleccionado]);

  if (loading) return <div>Cargando...</div>;
  if (!producto) return <div>No se encontró el producto</div>;

  return (
  <div className="fade-in">

  <div className="menu-descripcion-ar">
    <button className="boton-descripcion" onClick={toggleMenu}>
      {isOpen ? <FiX id="icono-cerrar" /> : <div className="icon-container"><FiMenu id="icono-menu" /></div>}
    </button>
  </div>
  
  <div id="btn-en-ar">

  <div className="spinner">
    <button className="boton-spiner" onClick={() => disminuirCantidad(producto.ID_PRODUCTO)}>
    <span><FiMinus /></span>
    </button>
    <span className="numero">{cantidades?.[producto.ID_PRODUCTO] || 1}</span>

    <button className="boton-spiner" onClick={() => aumentarCantidad(producto.ID_PRODUCTO)}>
    <span><FiPlus /></span>
    </button>
  </div>

  <div className="voler-carrito">  
    <button onClick={volverACategoria} className="boton-volver"> 
      <span><FiArrowLeft /></span>
    </button>

      <button className="boton-añadir-carrito" onClick={() => añadirAlCarrito(producto)}>
        <span>Añadir al carrito</span>
      </button>
      </div>
  </div>


  {isOpen && <div className="overlay" onClick={closeMenu}></div>}

  <div className={`menu ${isOpen ? 'open' : ''}`}>
    <div className="descripcion-producto">
      <h1>{producto.NOMBRE_PRODUCTO}</h1>
      <p>{producto.DESCRIPCION_PRODUCTO}</p>
      <p id="precio-en-tarjeta"><stbrong>Precio:</stbrong> ${producto.PRECIO}</p>
      
      <div className="container-botones-decrip" id="btn-en-menu">

      <button className="boton-añadir-carrito" onClick={() => añadirAlCarrito(producto)}>
        <span>Añadir al carrito</span>
      </button>

        <div className="spinner">
          <button className="boton-spiner" onClick={() => disminuirCantidad(producto.ID_PRODUCTO)}>
            <span><FiMinus /></span>
          </button>
          <span className="numero">{cantidades?.[producto.ID_PRODUCTO] || 1}</span>

          <button className="boton-spiner" onClick={() => aumentarCantidad(producto.ID_PRODUCTO)}>
            <span><FiPlus /></span>
          </button>
        </div>
      </div>
    </div>
  </div>




  <div className="app-container">
    <div ref={videoContainerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden'
    }} />

    <div className="ar-container">
      <a-scene
        embedded
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true; alpha: true;"
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-marker preset="hiro">
          <a-entity
            gltf-model={modelos[modeloSeleccionado]}
            scale={escalas[modeloSeleccionado] || "1 1 1"}
            position="0 0 0"
            rotation="0 0 0"
          ></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
    </div>
  </div>  


  </div>
  );
}
