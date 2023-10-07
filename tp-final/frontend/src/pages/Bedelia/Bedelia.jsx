import './Bedelia.css';

import Content from '../../layouts/Content';
import BedeliaMenu from './BedeliaMenu';
import BedeliaInformationBar from './BedeliaInformationBar';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import Modal from '../../components/Modal';
import Login from './Login';

function Bedelia(){
    // const test = (t) =>{
    //     console.log(t);
    // }
    const [loginState, setLoginState] = useState({
        logged: false,
        loginUser: '',
        loginGroup: '',
        loginTimeOut: 0
    });
    const navigate = useNavigate();

    return (
        <>
            <Content>
                {!loginState.logged &&
                <>
                    <BedeliaInformationBar loginState={loginState} setLoginState={setLoginState}/>
                    <nav className="contentItem">
                        <BedeliaMenu />
                        <nav className="contentModule">
                            <Outlet />
                        </nav>
                    </nav>
                </>
                }
            </Content>
            <Modal title={'Iniciar Sesión'} state={loginState.logged} changeState={()=>{navigate('/');}} showBorderOnHeader={false} >
                <Login setLoginState={setLoginState}/>
            </Modal>

        </>
    );
}

export default Bedelia;