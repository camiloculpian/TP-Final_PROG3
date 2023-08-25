
import './Bedelia.css';

import Content from '../../layouts/Content';
import BedeliaMenu from '../../components/BedeliaMenu';
import { Outlet } from 'react-router';

function Bedelia(){
    return (
        <>
            <Content>
                <nav className="contentItem">
                    <BedeliaMenu />
                    <nav className="contentModule">
                        <Outlet />
                    </nav>
                </nav> 
            </Content>
        </>
    );
}

export default Bedelia;