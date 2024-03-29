import { useContext, useState } from 'react';
import './Bedelia.css'
import { AdaptativeTable } from '../../components/AdaptativeTable';
import { Notification } from '../../components/Notifications';
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from '../../components/UserContext';

function SearchStudent({returnStudent}){
    const {userData } = useContext(UserContext);
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const [formData, setFormData] = useState({
        nombreBusqueda: "",
        apellidoBusqueda: "",
    });

    const [studentsList, setStudentsList] = useState();

    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...formData,
          [name]: value,
        };
        setFormData(newValues);
    }

    const setReturnStudent = (s) =>{
        returnStudent({
            idEstudiante: s['idEstudiante'],
            dni: s['DNI'],
            nombre: s['Nombre'],
            apellido: s['Apellido'],
            fechaNacimiento: s['Fecha Nac.'],
            nacionalidad: s['idNacionalidad'],
            correoElectronico: s['e-m@il'],
            celular: s['Celular'],
        });
        
    }

    const searchStudent = async (e) =>{
        e.preventDefault();
        launchNotificacion({
            notifMessage: <p>Buscando Estudiante</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${userData?.token}`}
        };
        fetch(`http://localhost:3005/api/v1/estudiante/lookup?apellido=${encodeURIComponent(formData.apellidoBusqueda)}&nombre=${encodeURIComponent(formData.nombreBusqueda)}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    // const error = (data && data.message) || response.status;
                    const error = data;
                    console.log(error);
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                setStudentsList(data);
                launchNotificacion({
                    notifMessage: '',
                    notifType: '',
                    state: false
                })
            }).catch(error => { 
                launchNotificacion({
                    notifMessage: <>
                                    <p>No se pudo obtener la lista debido al siguiente error</p>
                                    <h4>{error.message}</h4>
                                  </>,
                    notifType: 'ERROR',
                    state: false
                })
            });;
    }

    return (
        <ProtectedElement mustBeBedel={true}>
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
                <AdaptativeTable tableData={studentsList?studentsList:{studentsList: []}} callbackSelectable={setReturnStudent} scroll={true}/>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </ProtectedElement>
    );
}

export default SearchStudent;