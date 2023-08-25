import './Home.css'

import Content from '../../layouts/Content';
import { NavLink } from 'react-router-dom';
import QuickAccessMenu from '../../components/QuickAccessMenu';
import News from '../../components/News';
function Home(){
    return (
        <Content>
            <nav className="contentItem">
                <NavLink to={'/carreras'} className="botonRojoGrande">NUESTRAS CARRERAS</NavLink>
            </nav>
            <nav className="contentItem">
            <QuickAccessMenu />
            <News/>
            </nav>
        </Content>
  );
}

export default Home