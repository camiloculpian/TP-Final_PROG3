import './QuickAccessMenu.css';
import {NavLink} from 'react-router-dom';

function QuickAccessMenu() {
    return(
        <aside className="quickAccessMenu">
            <section className="seccionHeader">ACCESOS RAPIDOS</section>
            <NavLink to='/bedelia' className="quickAccessMenuItem imgAccesoBedeliaWh"><h4>Acceso Bedelia</h4></NavLink>
            <NavLink className="quickAccessMenuItem imgCampusVirtualWh"><h4>Campus Virtual</h4></NavLink>
            <NavLink className="quickAccessMenuItem imgPlanEstrategicoWh"><h4>Plan Estrategico 2017-2054</h4></NavLink>
            <NavLink className="quickAccessMenuItem imgCorreoInstitucionalWh"><h4>Correo Institucional</h4></NavLink>
            <NavLink className="quickAccessMenuItem imgBibliotecaDigitalWh"><h4>Biblioteca Digital</h4></NavLink>
        </aside>
    );

};
export default QuickAccessMenu