import { useEffect, useState } from "react";
import { Notification } from "../../components/Notifications";

// DEJAR ELEGIRT EL NOMBRE DEL CAMPO

function CareerSelect({callbackSelected, name='careerSelect', selected}){
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    const [datos, setDatos] = useState(null);
    // const [selected, setSelected] = useState(defaultSelected);

    useEffect(()=>{
        launchNotificacion({
            notifMessage: <p>Cargando Carreras</p>,
            notifType: 'WAIT',
            state: true
        })
        const consulta = `http://localhost:3005/api/v1/carrera/lookup`;
        fetch(consulta, {method: 'GET', credentials: 'include'})
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
            console.log('error -->', error);
            launchNotificacion({
                notifMessage:
                            <>
                                <p>NO se pudo cargar Carreras</p>
                                <h4>{error}</h4>
                            </>,
                notifType: 'ERROR',
                state: true
            })
        });
    }, []);

    const changeSelected = event => {
        callbackSelected(event);
        selected = event.target.value;
      };

    return (
        <>
            <select value={selected} onChange={changeSelected} name={name} className="dataEntry" >
                {datos?.map((carrera, index) => {
                    return (
                        <option key={carrera.ID} value={carrera.ID} >{carrera.Nombre}</option>
                    );
                })}
            </select>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
       </> 
    );
}

export default CareerSelect;