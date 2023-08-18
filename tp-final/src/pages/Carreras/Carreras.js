import './Carreras.css';
import {NavLink} from 'react-router-dom';

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
function Carreras() {
    return(
        <>
            <Header />
            <div className="espacioRojo">Carreras de pregrado y grado</div>
            <div>
                <ul className="menuHorizontalColorido">
                    <li id="licSist"><NavLink to="/carreras">Lic. en Sistemas</NavLink></li>
                    <li id="progSist"><NavLink to="/carreras">Prog. de Sistemas</NavLink></li>
                    <li id="tecDweb"><NavLink to="/carreras">Tec. Universitaria en Desarrollo Web</NavLink></li>
                    <li id="contPub"><NavLink to="/carreras">Contador Público</NavLink></li>
                    <li id="licAdm"><NavLink to="/carreras">Lic. en Ciencias de la Administracion</NavLink></li>
                    <li id="profPort"><NavLink to="/carreras">Prof. en Portugues</NavLink></li>
                    <li id="licTur"><NavLink to="/carreras">Lic. en Turismo</NavLink></li>
                </ul>
            </div>
            <Content>
                <p>Aca hay que implementar que lea las carreras de forma dinamica, aplique los estilos de colores de forma dinamica y muestre el contnido de l misma manera</p>
            </Content>
            <Footer />
        </>
    )
}

export default Carreras;