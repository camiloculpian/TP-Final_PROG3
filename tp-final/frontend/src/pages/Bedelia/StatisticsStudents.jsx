import './Statistics.css';
import { ProtectedElement } from "../../components/ProtectedElement";
import { useEffect, useState } from 'react';
import { Notification } from '../../components/Notifications';

export default function StatiscticsStudents(){
    const [data, setData] = useState();
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        };
        launchNotificacion({
            notifMessage: <p>Obteniendo estadisticas de los estudiantes</p>,
            notifType: 'WAIT',
            state: true
        })
        fetch('http://localhost:3005/api/v1/estadistica/estudiante', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    // const error = (data && data.message) || response.status;
                    const error = data;
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
                                    <p>No se pudo obtener la estadistica debido al siguiente error</p>
                                    <h4>{error.message}</h4>
                                  </>,
                    notifType: 'ERROR',
                    state: false
                })
            });;
    }, [])

    return(
        <ProtectedElement mustBeDecano={true}>
            <div className="moduleContent">
                <h3>Informacion de los Estudiantes:</h3>
                <div className="statisticsBoxs">
                    {
                        <div className={"infoBox Color1"}>
                            <div className="infoBoxTitle">
                                <h4>Estudiantes</h4>
                            </div>
                                <div className="infoBoxContent">
                                <p>Total:{' '+data?.data[0]?.estudiantes}</p>
                                <p>Argentinos:{' '+data?.data[0]?.nacionales}</p>
                                <p>Extrangeros:{' '+data?.data[0]?.extrangeros}</p>
                            </div>
                        </div>
                    }
                </div>
             </div>
             <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </ProtectedElement>
    );
}