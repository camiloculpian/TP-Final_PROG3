import './Bedelia.css';

import Content from '../../layouts/Content';
import BedeliaMenu from './BedeliaMenu';
import BedeliaInformationBar from './BedeliaInformationBar';
import { Outlet, useNavigate } from 'react-router';
import { useContext } from 'react';
import Modal from '../../components/Modal';
import Login from './Login';
import { UserContext } from '../../components/UserContext';
import { ProtectedElement } from '../../components/ProtectedElement';
function Bedelia(){
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    return (
        <>
            <Content>
                <ProtectedElement mustBeBedel={false}>
                    <BedeliaInformationBar/>
                    <nav className="contentItem">
                        <BedeliaMenu />
                        <nav className="contentModule">
                            <Outlet />
                        </nav>
                    </nav>
                </ProtectedElement>
            </Content>
            <Modal title={'Iniciar Sesión'} state={!userData} changeState={()=>{navigate('/');}} showBorderOnHeader={false} >
                <Login/>
            </Modal>

        </>
    );
}

export default Bedelia;