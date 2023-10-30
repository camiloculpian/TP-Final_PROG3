import './Statistics.css';
import { ProtectedElement } from "../../components/ProtectedElement";
import { useEffect, useState } from 'react';

export default function StatiscticsCareers(){
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
            notifMessage: <p>Obteniendo estadisticas de las carreras</p>,
            notifType: 'WAIT',
            state: true
        })
        fetch('http://localhost:3005/api/v1/estadistica/carrera', requestOptions)
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
                <h3>Carreras:</h3>
                <div className="statisticsBoxs">
                    {data?.data?.map((element, id) => {
                        return(
                                <div className={"infoBox Color"+parseInt(id+1%7)}>
                                    <div className="infoBoxTitle">
                                    <h4>{element.Carrera}</h4>
                                    </div>
                                    <div className="infoBoxContent">
                                        <p>Tot. de Mat.:</p>
                                        <p>Est. Inscriptos:</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
             </div>     
        </ProtectedElement>
    );
}