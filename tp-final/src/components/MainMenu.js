import './MainMenu.css';
import {NavLink} from 'react-router-dom';

function MainMenu() {
  // const navigate = useNavigate();
  return (
    <nav>
      <ul className="menuHorizontal">
        <li><NavLink exact to='/' activeClassName='active'>Home</NavLink></li>
        <li><NavLink exact to='/institucional' >Institucional</NavLink></li>
        <li><NavLink exact to='/contacto' >Contacto</NavLink></li>
        <li><NavLink exact to='/carreras' >Carreras</NavLink></li>
        <li><NavLink exact to='/bedelia' >Acceso Bedelia</NavLink></li>
      </ul>
    </nav>
    );
  }
  
  export default MainMenu;