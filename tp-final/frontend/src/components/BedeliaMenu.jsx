import './BedeliaMenu.css';
import {NavLink} from 'react-router-dom';

function BedeliaMenu(){
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
                            <li><NavLink to={'/bedelia/subjects/register'}>Registrar Materia</NavLink></li>
                            <li><NavLink to={'/bedelia/subjects/list'}>Listado de Materias</NavLink></li>
                            <li><NavLink to={'/bedelia/subjects/search'}>Buscar Materia</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Carreras</p>
                        <ul>
                            <li><NavLink to={'/bedelia/careers/register'}>Registrar Carrera</NavLink></li>
                            <li><NavLink to={'/bedelia/careers/list'}>Listado de Carreras</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Inscripcion a Materias</p>
                        <ul>
                            <li><NavLink to={'/bedelia/enrollments/enroll'}>Inscribir a Materia</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default BedeliaMenu;