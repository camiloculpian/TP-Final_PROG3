import {NavLink} from 'react-router-dom';
import './Header.css';
import MainMenu from '../components/MainMenu';

function Header() {
  return (
    <header>
      <div className='headerContent'>
        <div className="headerItem">
          <NavLink to="/"><div className="logoUner"></div></NavLink>
        </div>
        <div className="headerItem">
          <MainMenu/>
        </div>
      </div>
    </header>
  );
}

export default Header;