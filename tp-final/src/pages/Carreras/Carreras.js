import './Carreras.css';

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
                    <li id="licSist"><a href="#">Lic. en Sistemas</a></li>
                    <li id="progSist"><a href="#">Prog. de Sistemas</a></li>
                    <li id="tecDweb"><a href="#">Tec. Universitaria en Desarrollo Web</a></li>
                    <li id="contPub"><a href="#">Contador Público</a></li>
                    <li id="licAdm"><a href="#">Lic. en Ciencias de la Administracion</a></li>
                    <li id="profPort"><a href="#">Prof. en Portugues</a></li>
                    <li id="licTur"><a href="#">Lic. en Turismo</a></li>
                </ul>
            </div>
            <Content>
            </Content>
            <Footer />
        </>
    )
}

export default Carreras;