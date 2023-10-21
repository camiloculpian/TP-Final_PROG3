import './BedeliaMenu.css';
import {NavLink} from 'react-router-dom';
// DEBERIA CREARSE EL MENU CON UN JSON DESCRIPTIVO, PASADO POR EL SERVIDOR DE ACUERDO A LOS PERMISOS DEL USUARIO!!!
function BedeliaMenu({menuJson}){
    return(
        <aside>
            <section className="seccionHeader">BEDELIA</section>
            <div className="dropdownVerticalMenu">
                <ul>
                    <li><p>Estudiantes</p>
                        <ul>
                            <li><NavLink to={'/bedelia/students/register'}>Registrar Estudiante</NavLink></li>
                            <li><NavLink to={'/bedelia/students/edit'}>Editar Estudiante</NavLink></li>
                            <li><NavLink to={'/bedelia/students/delete'}>Eliminar Estudiante</NavLink></li>
                            <li><NavLink to={'/bedelia/students/list'}>Listado de Estudiantes</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Materias</p>
                        <ul>
                            <li><NavLink to={'/bedelia/courses/register'}>Registrar Materia</NavLink></li>
                            <li><NavLink to={'/bedelia/courses/list'}>Listado de Materias</NavLink></li>
                            <li><NavLink to={'/bedelia/courses/search'}>Buscar Materia</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Carreras</p>
                        <ul>
                            <li><NavLink to={'/bedelia/careers/register'}>Registrar Carrera</NavLink></li>
                            <li><NavLink to={'/bedelia/careers/list'}>Listado de Carreras</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Inscripciones</p>
                        <ul>
                            <li><NavLink to={'/bedelia/enrollments/course/list'}>Inscripciones a Materias</NavLink></li>
                            <li><NavLink to={'/bedelia/enrollments/career/list'}>Inscripciones a Carreras</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default BedeliaMenu;