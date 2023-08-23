
import './Bedelia.css';

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
import BedeliaMenu from '../../components/BedeliaMenu';
import { Outlet } from 'react-router';

function Bedelia(){
    return (
        <>
            <Header />
            <Content>
                <nav className="contentItem">
                    <BedeliaMenu />
                    <nav className="contentModule">
                        <Outlet />
                    </nav>
                </nav> 
            </Content>
            <Footer />
        </>
    );
}

export default Bedelia;