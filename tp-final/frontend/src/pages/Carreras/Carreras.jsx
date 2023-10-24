import './Carreras.css';
import {NavLink, useLocation} from 'react-router-dom';

import Content from '../../layouts/Content';
import { useEffect, useState } from 'react';
import { Notification } from '../../components/Notifications';
function Carreras() {
    
    const query = new URLSearchParams(useLocation().search);

    const [carreras, setCarreras] = useState({});
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    const getCarres = () => {
        launchNotificacion({
            notifMessage: <p>Obteniendo lista de carreras</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        };
        fetch('http://localhost:3005/api/v1/publico/carreras', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response || !response.ok) {
                    // const error = (data && data.message) || response.status;
                    const error = data;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                setCarreras(data);
                launchNotificacion({
                    notifMessage: '',
                    notifType: '',
                    state: false
                })
            }).catch(error => { 
                launchNotificacion({
                    notifMessage: <>
                                    <p>No se pudo obtener la lista de carreras debido al siguiente error</p>
                                    <h4>{error.message}</h4>
                                  </>,
                    notifType: 'ERROR',
                    state: false
                })
            });;
    };
    useEffect(()=>{getCarres()},[]);
    return(
        <>
            <div className="espacioRojo">Carreras de pregrado y grado</div>
            <div>
                <ul className="menuHorizontalColorido">
                    {carreras['data']?.map((element, id) => {
                        return(
                            <li key={id} className={'Color'+parseInt(id+1%7)}><NavLink to={'/carreras/?selected='+id}><p>{element.carrera}</p></NavLink></li>
                        )
                    })}
                </ul>
            </div>
            <Content>
                <p>Modalidad:{' '+carreras['data']?.[query.get('selected')]?.modalidad}</p>
                <p>idCarrera para buscar materias e info:{' '+carreras['data']?.[query.get('selected')]?.codigo}</p>
            </Content>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    )
}

export default Carreras;