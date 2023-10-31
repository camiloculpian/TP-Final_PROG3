import { useContext, useEffect, useState } from "react";
import { Notification } from "../../components/Notifications";
import { UserContext } from '../../components/UserContext';

// DEJAR ELEGIRT EL NOMBRE DEL CAMPO

//si se pasa idEstudiante, solo devuelve las carreras a las que esta inscripto el estudiante

function CareerSelect({callbackSelected, name='careerSelect', value, idEstudiante}){
    const {userData } = useContext(UserContext);
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    const [datos, setDatos] = useState(null);
    //const [selected, setSelected] = useState(defaultSelected);

    useEffect(()=>{
        launchNotificacion({
            notifMessage: <p>Cargando Carreras</p>,
            notifType: 'WAIT',
            state: true
        })
        let consulta = '';
        !idEstudiante ? consulta = `http://localhost:3005/api/v1/carrera/lookup`: consulta = `http://localhost:3005/api/v1/inscripcion/career/lookup?idEstudiante=${encodeURIComponent(idEstudiante)}&showOnlyInscripted=true`
        fetch(consulta, {method: 'GET', headers: {'Authorization': `Bearer ${userData?.token}`}})
        .then( resp => {
            resp.json().then(data => {
                setDatos(data['data']);
            } )
            launchNotificacion({
                notifMessage: "",
                notifType: "",
                state: false
            })
        })
        .catch(error => {
            launchNotificacion({
                notifMessage:
                            <>
                                <p>NO se pudo cargar Carreras</p>
                                <h4>{error.message}</h4>
                            </>,
                notifType: 'ERROR',
                state: true
            })
        });
    }, [idEstudiante,userData?.token]);

    const changeSelected = event => {
        callbackSelected(event);
        value = event.target.value;
      };
    return (
        <>
            <select name={name} className="dataEntry" value={value? parseInt(value): ''} onChange={changeSelected}>
                <option key={''} value={''} >{'Seleccione la Carrera'}</option>
                {datos?.map((carrera) => {
                    return (
                        <option key={carrera.idCarrera} value={carrera.idCarrera} >{carrera.Nombre}</option>
                    );
                })}
            </select>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
       </> 
    );
}

export default CareerSelect;