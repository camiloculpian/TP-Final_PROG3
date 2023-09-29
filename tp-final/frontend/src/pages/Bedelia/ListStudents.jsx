import { useEffect, useState } from "react";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { Notification } from "../../components/Notifications";


export default function ListStudent(){
    // ACA ELFETCH DE LOS DATOS
    const [data, setData] = useState();
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
        };
        launchNotificacion({
            notifMessage: <p>Obteniendo lista de estudiantes</p>,
            notifType: 'WAIT',
            state: true
        })
        fetch('http://localhost:3005/api/v1/estudiante/lookup', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                setData(data);
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
    }, [])

    return(
        <>
            <div className="moduleContent">
                <fieldset>
                    <legend>Estudiantes -&gt; Listar Estudiantes</legend>
                    <AdaptativeTable json={data} />
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    )
}