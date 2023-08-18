import './MainMenu.css';
import {NavLink} from 'react-router-dom';
function MainMenu() {
  // const navigate = useNavigate();
  return (
    <nav>
      <ul className="mainDropDowm">
        <li className='imgInstitucional'><NavLink to='/institucional'>Institucional</NavLink>
          {/* <ul className='dropDownContent'>
            <NavLink className='href' exact to='/'>Etiqueta Submenu 1</NavLink>
            <NavLink exact to='/'>Etiqueta 2</NavLink>
          </ul> */}
        </li>
        <li className='imgCarreras'><NavLink to='/carreras' >Carreras</NavLink></li>
        <li className='imgContact'><NavLink to='/contacto'>Contacto</NavLink></li>
        <li className='imgLogin'><NavLink to='/bedelia' >Acceso Bedelia</NavLink></li>
      </ul>
    </nav>
    );
  }
  
  export default MainMenu;