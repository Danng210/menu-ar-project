import { Link } from 'react-router-dom';
import { FiX } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";

export default function CabeceraMenu({
  textActivo,
  otrasCategorias,
  busqueda,
  setBusqueda
}) {

  return (
  <section id="titulo-y-busqueda">

  <div className="head-container">
    <Link to="/" className="back-button">
      <span > <FiChevronLeft /></span>
    </Link>
    <h1 id="titulo-menu">{busqueda ? "Resultados de" : textActivo}</h1>
  </div>

    <div className="caja-busqueda">
      <input className="busqueda"
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {busqueda && (
        <div className="salir-busqueda">
          <button id="cerrar-busq" onClick={() => setBusqueda("")}><FiX /></button>
        </div>
      )}
    </div>

    {!busqueda && (
    <div className="filtos-scrollh">
      <nav>
        <p id="activo">{textActivo}</p>
        {otrasCategorias.map(cat => (
          <Link to={`/menu/${cat.toLowerCase()}`} key={cat}>
            <p>{cat}</p>
          </Link>
        ))}
      </nav>
    </div>
    )}
  </section>
  );
}