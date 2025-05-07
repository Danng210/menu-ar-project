import { useNavigate } from 'react-router-dom';


export default function Bienvenida() {
const navigate = useNavigate(); // ✅ Esto solo puede ir dentro del componente

const redirigirPorID = async (idProducto) => {
    try {
    const response = await fetch(`/api/buscar_nombre_por_id.php?id=${idProducto}`);
    const data = await response.json();

    if (data?.NOMBRE_PRODUCTO) {
        navigate(`/menu/descripcion/${data.NOMBRE_PRODUCTO}`, {
        state: {
            categoriaActual: "entradas",
            modeloSeleccionado: data.NOMBRE_PRODUCTO
        }
        });
    } else {
        console.error("Producto no encontrado");
    }
    } catch (error) {
    console.error("Error al buscar producto:", error);
    }
};

return (
    <section id="anuncios">
    <h1>Bienvenido</h1>
    <h2>Anuncios</h2>

    <div className="anuncios-scrollh">
        <button  className="tarjeta-anuncio" onClick={() => redirigirPorID("prod-004")}>
        {/* <div id="img-mientras-tanto">
          <img
            src="../assets/images/anuncio_proximamente.png"
            alt={"Enchiladas Norteñas de Res"}
          />
        </div> */}
        </button>
        <div className="anuncio-img"></div>
    </div>
    </section>
);
}
