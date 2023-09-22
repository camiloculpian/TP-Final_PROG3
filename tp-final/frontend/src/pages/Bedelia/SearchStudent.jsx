import { useState } from 'react';
import './Bedelia.css'

function SearchStudent({returnStudent}){

    const [formData, setFormData] = useState({
        nombreBusqueda: "",
        apellidoBusqueda: "",
    });

    const [student, setStudent] = useState([{ 
        idEstudiante: ''
    }]);

    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...formData,
          [name]: value,
        };
        setFormData(newValues);
    }

    const setReturnStudent = () =>{
        returnStudent(student);
    }

    const searchStudent = async (e) =>{
        e.preventDefault();
        console.log('Buscar Estudiante con nombre: '+formData.nombreBusqueda+', y apellido: '+formData.apellidoBusqueda);
    }

    return (
            <div>
                <form onSubmit={searchStudent}  method='GET'>
                    <div className="dataLine">
                        <label className="dataTitle" htmlFor="apellidoBusqueda">Apellido:</label>
                        <input className="dataEntry" id="apellidoBusqueda" name="apellidoBusqueda" autoFocus="" placeholder="Ingrese Apellido" value={formData.apellidoBusqueda} onChange={handleChange}></input>
                        <label className="dataTitle" htmlFor="nombreBusqueda">Nombre:</label>
                        <input className="dataEntry" id="nombreBusqueda" name="nombreBusqueda" autoFocus="" placeholder="Ingrese Nombre" value={formData.nombreBusqueda} onChange={handleChange}></input>
                        <button type='submit' className="searchButton"></button>
                    </div>
                </form>
                <table className='searchTable'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Fecha Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody id="LISTADO_ESTUDIANTES_DINAMICO_MODAL"></tbody>
                </table>
                <button className="botonComun" style={{float: 'left'}} onClick={setReturnStudent} type="button">Aceptar</button>
            </div>

    );
}

export default SearchStudent;