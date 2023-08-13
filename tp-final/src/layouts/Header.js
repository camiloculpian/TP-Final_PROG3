//import logo from './logo.svg';
import './Header.css';
import MainMenu from '../components/MainMenu';

function Header() {
  return (
    <header>
      <div className='headerContent'>
        <div className="headerItem">
          <a href="/index.html"><div className="logoUner"></div></a>
        </div>
        <div className="headerItem">
          <MainMenu/>
        </div>
      </div>
    </header>
  );
}

export default Header;