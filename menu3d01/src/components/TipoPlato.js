import { Link } from 'react-router-dom';

export default function TipoPlatillos() {

return(
    <section id="sec-platillos">        
    <h2>Nuestros Platillos</h2>

    <nav>
    <Link to={`/menu/${"entradas"}`} key={"entradas"}>
        <div className="enviar-a-menu" id="fondo-entradas">
            <h2 id="texto"> 
            Entradas
            </h2>
            <i class="fi fi-br-angle-right"></i>
        </div>
    </Link>

    <Link to={`/menu/${"platos fuertes"}`} key={"platos fuertes"}>
        <div className="enviar-a-menu" id="fondo-pfuertes">
            <h2 id="texto"> 
            Platos fuertes
            </h2>
            <i class="fi fi-br-angle-right"></i>
        </div>
    </Link>

    <Link to={`/menu/${"postres"}`} key={"postres"}>
        <div className="enviar-a-menu" id="fondo-postres">
            <h2 id="texto"> 
            Postres
            </h2>
            <i class="fi fi-br-angle-right"></i>
        </div>
    </Link>
    </nav>
    </section>
);
}