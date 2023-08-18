import React, {useState} from 'react';

import { useLocation } from "react-router-dom";

import Modal from '../../components/Modal';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
function Contacto() {
    const location = useLocation();
    const [estadoModal, cambiarEstadoModal] = useState(location.state?.estadoModal);
    console.log('function Contacto(props): estadoModal',location.state?.estadoModal);
    return(
        <>
            <Header />
            <Content>
            <nav className="contenido">
                <main className="contenidoPrincipal">
                    <nav className="contenido contenidoPrincipal">
                        <div className="contenidoCentrado">
                            <h2>Informacion de Contacto</h2>
                        </div>
                        <h3  className="celeste">Correos Electrónicos Institucionales</h3>
                        <section className="contenedorDeItems">
                            <div className="item">
                                <h4  className="celeste contentWithoutBotomMargin">Secretaría de Extensión Universitaria</h4>
                                <p className="contentWithoutMargin">informes.fcad@uner.edu.ar</p>
                            </div>
                            <div className="item">
                                <h4  className="celeste contentWithoutBotomMargin">Oficina de Ciencia y Técnica</h4>
                                <p className="contentWithoutMargin">oficinacyt.fcad@uner.edu.ar</p>
                            </div>
                            <div className="item">
                                <h4  className="celeste contentWithoutBotomMargin">Oficina de Becas</h4>
                                <p className="contentWithoutMargin">estudiantes.fcad@uner.edu.ar</p>
                            </div>
                            <div className="item">
                                <h4  className="celeste contentWithoutBotomMargin">Oficina de Pasantías</h4>
                                <p className="contentWithoutMargin">pasantias.fcad@uner.edu.ar</p>
                            </div>
                        </section>
                        <h2 className="celeste">Teléfonos Directos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sector</th>
                                    <th>Numero</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Operadora</td>
                                    <td>423 1400</td>
                                </tr>
                                <tr>
                                    <td>Decano</td>
                                    <td>423 1402</td>
                                </tr>
                                <tr>
                                    <td>Vicedecano</td>
                                    <td>423 1403</td>
                                </tr>
                                <tr>
                                    <td>Secretaría de Extensión Universitaria</td>
                                    <td>423 1404</td>
                                </tr>
                                <tr>
                                    <td>Gabinete Administración de Redes</td>
                                    <td>423 1406</td>
                                </tr>
                                <tr>
                                    <td>Gabinete de Difusión</td>
                                    <td>423 1407</td>
                                </tr>
                                <tr>
                                    <td>Gabinete de Investigación Sistemas</td>
                                    <td>423 1408</td>
                                </tr>
                                <tr>
                                    <td>Gabinete humanidades</td>
                                    <td>423 1409</td>
                                </tr>
                                <tr>
                                    <td>FAX</td>
                                    <td>423 1410</td>
                                </tr>
                                <tr>
                                    <td>Secretaría Académica</td>
                                    <td>423 1411</td>
                                </tr>
                            </tbody>
                        </table>
                    </nav>
                </main>
            </nav>
            </Content>
            <Footer />
            <Modal title={'Fromulario de Contacto'} state={estadoModal} changeState={cambiarEstadoModal}>
                <p>Contenido del modal</p>
            </Modal>
        </>
    )
}

export default Contacto;