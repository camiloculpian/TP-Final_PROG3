import './Home.css'
import React, {useState} from 'react';

import Modal from '../../components/Modal';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
import { NavLink } from 'react-router-dom';
import QuickAccessMenu from '../../components/QuickAccessMenu';
function Home(){
    const [estadoModal, cambiarEstadoModal] = useState(false);
    return (
        <>
            <Header />
            <Content>
                <nav className="contentItem">
                    <NavLink exact to={'/carreras'} className="botonRojoGrande">NUESTRAS CARRERAS</NavLink>
                </nav>
                <nav className="contentItem">
                <QuickAccessMenu />
                </nav>
            </Content>
            <Footer />
            <Modal title={'Titulo'} state={estadoModal} changeState={cambiarEstadoModal}>
                <p>Contenido del modal</p>
            </Modal>
        </>
  );
}

export default Home