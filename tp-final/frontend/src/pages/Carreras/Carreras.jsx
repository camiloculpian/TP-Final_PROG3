import './Carreras.css';
import {NavLink} from 'react-router-dom';

import Content from '../../layouts/Content';
function Carreras() {
    return(
        <>
            <div className="espacioRojo">Carreras de pregrado y grado</div>
            <div>
                <ul className="menuHorizontalColorido">
                    <li id="licSist"><NavLink to="/carreras/lis_sist">Lic. en Sistemas</NavLink></li>
                    <li id="progSist"><NavLink to="/carreras/prog_sist">Prog. de Sistemas</NavLink></li>
                    <li id="tecDweb"><NavLink to="/carreras/des_web">Tec. Universitaria en Desarrollo Web</NavLink></li>
                    <li id="contPub"><NavLink to="/carreras/cont_pub">Contador Público</NavLink></li>
                    <li id="licAdm"><NavLink to="/carreras/lic_adm">Lic. en Ciencias de la Administracion</NavLink></li>
                    <li id="profPort"><NavLink to="/carreras/prof_port">Prof. en Portugues</NavLink></li>
                    <li id="licTur"><NavLink to="/carreras">Lic. en Turismo</NavLink></li>
                </ul>
            </div>
            <Content>
                <p>Aca hay que implementar que lea las carreras de forma dinamica, aplique los estilos de colores de forma dinamica y muestre el contenido de la misma manera</p>
            </Content>
        </>
    )
}

export default Carreras;