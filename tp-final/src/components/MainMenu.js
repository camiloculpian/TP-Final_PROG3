import './MainMenu.css';
import {NavLink} from 'react-router-dom';

function MainMenu() {
  // const navigate = useNavigate();
  return (
    <nav>
      <ul className="mainDropDowm">
        <li className='imgHome'><NavLink exact to='/' activeClassName='active'>Home</NavLink>
          {/* <ul className='dropDownContent'>
            <NavLink exact to='/'>Etiqueta Submenu 1</NavLink>
            <NavLink exact to='/'>Etiqueta 2</NavLink>
          </ul> */}
        </li>
        <li className='imgInstitucional'><NavLink exact to='/institucional' >Institucional</NavLink>
          {/* <ul className='dropDownContent'>
            <NavLink exact to='/'>Etiqueta Submenu 1</NavLink>
            <NavLink exact to='/'>Etiqueta 2</NavLink>
          </ul> */}
        </li>
        <li className='imgContact'><NavLink exact to='/contacto' >Contacto</NavLink></li>
        <li><NavLink exact to='/carreras' >Carreras</NavLink></li>
        <li><NavLink exact to='/bedelia' >Acceso Bedelia</NavLink></li>
      </ul>
    </nav>
    );
  }
  
  export default MainMenu;