import React, {useState} from 'react';

import Modal from '../../components/Modal';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
function Contacto() {
    const [estadoModal, cambiarEstadoModal] = useState(false);
    return(
        <>
            <Header />
            <Content />
            <Footer />
            <Modal title={'Titulo'} state={estadoModal} changeState={cambiarEstadoModal}>
                <p>Contenido del modal</p>
            </Modal>
        </>
    )
}

export default Contacto;