import './Footer.css';
// import logo from '../assets/logo-fcad.png'

function Footer() {
  return (
    <footer>
      <div className='anteFooter'>
        <ul>
          <li>Compras y Contrataciones</li>
          <li>Consejo Directivo</li>
          <li>Conscurso Docente</li>
          <li>Reválidas Docentes</li>
          <li>Concursos Pays</li>
        </ul>
      </div>
      <nav className='footerContent'>
        <div className='footerContentItem'>
          <h3>Enlaces útiles</h3>
          <ul>
            <li>Universidad Nacional de Entre Ríos</li>
            <li>Transparencia</li>
            <li>UNER Noticias</li>
            <li>Argentina Investiga</li>
            <li>EDUNER</li>
            <li>SIRUNER</li>
            <li>SeDiCI</li>
          </ul>
        </div>
        <div className='footerContentItem'>
          <h3>Somos parte de</h3>
          <ul>
            <li>AAPP</li>
            <li>BFA-Blockchain Federal Argentina</li>
            <li>ADENAG</li>
            <li>AUGM</li>
            <li>CODECE</li>
            <li>Red UNCI</li>
          </ul>
        </div>
        <div className='footerContentItem'>
          <h3>Facultad de Ciencias de la Administracion</h3>
          <ul>
            <p>Monseñor Tavella 1424. Concordia. CP(3200). | Provincia de Entre Ríos</p>
            <p>Teléfono: (+54) (345) 4231400 – Fax: (+54) (345) 4231410 | E-mail.: informes.fcad@uner.edu.ar</p>
          </ul>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;