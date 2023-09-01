
import './Bedelia.css';

import Content from '../../layouts/Content';
import BedeliaMenu from '../../components/BedeliaMenu';
import BedeliaInformationBar from '../../components/BedeliaInformationBar';
import Modal from '../../components/Modal';
import { Outlet } from 'react-router';
import { useState } from 'react';
import Login from './Login';

function Bedelia(){
    const [estadoModal, cambiarEstadoModal] = useState(false);
    return (
        <>
        <Content>
            <BedeliaInformationBar />
            <nav className="contentItem">
                <BedeliaMenu />
                <nav className="contentModule">
                    <Outlet />
                </nav>
            </nav> 
        </Content>
        <Modal title={'Iniciar Sesión'} state={estadoModal} changeState={cambiarEstadoModal} showBorderOnHeader={false} >
            <Login />
        </Modal>
        </>
    );
}

export default Bedelia;