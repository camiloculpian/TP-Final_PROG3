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
                            <li><NavLink to={'/bedelia/registerStudent'}>Registrar Estudiante</NavLink></li>
                            <li><NavLink to={'/bedelia/editStudent'}>Editar Estudiante</NavLink></li>
                            <li><NavLink to={'/bedelia/deleteStudents'}>Eliminar Estudiante</NavLink></li>
                            <li><NavLink to={'/bedelia/listStudent'}>Listado de Estudiantes</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Materias</p>
                        <ul>
                            <li><NavLink to={'/bedelia/registerSubject'}>Registrar Materia</NavLink></li>
                            <li><NavLink to={'/bedelia/listSubjects'}>Listado de Materias</NavLink></li>
                            <li><NavLink to={'/bedelia/searchSubject'}>Buscar Materia</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Carreras</p>
                        <ul>
                            <li><NavLink to={'/bedelia/registerCareer'}>Registrar Carrera</NavLink></li>
                            <li><NavLink to={'/bedelia/listCareer'}>Listado de Carreras</NavLink></li>
                        </ul>
                    </li>
                    <li><p>Inscripcion a Materias</p>
                        <ul>
                            <li><NavLink to={'/bedelia/enrollToSubject'}>Inscribir a Materia</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default BedeliaMenu;