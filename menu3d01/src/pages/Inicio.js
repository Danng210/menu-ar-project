import MenuHam from '../components/MenuHambuerguesa';
import Bienvenida from '../components/Bienvenida';
import TipoPlato from '../components/TipoPlato';
import '../styles/inicio.css';

export default function Inicio() {
    return(
        <section className="fade-in">
        <div className="contenedor-contenido">
            <Bienvenida/>
            <TipoPlato/>
            <MenuHam/>
        </div>
        </section>
    );
}