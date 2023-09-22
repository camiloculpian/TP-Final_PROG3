import { useState } from 'react';
import './Bedelia.css'

function SearchStudent({returnStudent}){
    const [valorBusqueda, setValorBusqueda] = useState([{
        apellidoBusqueda: '',
        nombreBusqueda: ''
    }]) 

    const [student, setStudent] = useState([{ 
        idEstudiante: ''
    }]);

    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...valorBusqueda,
          [name]: value,
        };
        setValorBusqueda(newValues);
    }

    const setReturnStudent = () =>{
        returnStudent(student);
    }

    const searchStudent = async (e) =>{
        e.preventDefault();
        console.log('Buscar Estudiante con nombre: '+valorBusqueda.nombreBusqueda+', y apellido: '+valorBusqueda.apellidoBusqueda);
    }

    return (
            <div>
                <form onSubmit={searchStudent}>
                    <div className="dataLine">
                        <label className="dataTitle" htmlFor="apellidoBusqueda">Apellido:</label>
                        <input className="dataEntry" name="apellidoBusqueda" autoFocus="" placeholder="Ingrese Apellido" value={valorBusqueda.apellidoBusqueda} onChange={handleChange}/>
                        <label className="dataTitle" htmlFor="nombreBusqueda">Nombre:</label>
                        <input className="dataEntry" name="nombreBusqueda" autoFocus="" placeholder="Ingrese Nombre" value={valorBusqueda.nombreBusqueda} onChange={handleChange}/>
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