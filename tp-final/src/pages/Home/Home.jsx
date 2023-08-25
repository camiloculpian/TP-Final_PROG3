import './Home.css'

import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
import { NavLink } from 'react-router-dom';
import QuickAccessMenu from '../../components/QuickAccessMenu';
import News from '../../components/News';
function Home(){
    return (
        <>
        <Header />
            <Content>
                <nav className="contentItem">
                    <NavLink to={'/carreras'} className="botonRojoGrande">NUESTRAS CARRERAS</NavLink>
                </nav>
                <nav className="contentItem">
                <QuickAccessMenu />
                <News/>
                </nav>
            </Content>
        <Footer />
        </>
  );
}

export default Home