import './Carreras.css';
import {NavLink, useLocation} from 'react-router-dom';

import Content from '../../layouts/Content';
import { useEffect, useState } from 'react';
import { Notification } from '../../components/Notifications';
import { AdaptativeTable } from '../../components/AdaptativeTable';
function Carreras() {
    
    const query = new URLSearchParams(useLocation().search);
    const [materias, setMaterias] = useState();
    const [carreras, setCarreras] = useState({});
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const getCarreras = () => {
        launchNotificacion({
            notifMessage: <p>Obteniendo lista de carreras</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'GET'
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
                // if(query.get('selected')){
                //     getMaterias(data['data']?.[query.get('selected')]?.codigo)
                // }
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

    const getMaterias = (codigoCarrera) => {
        setMaterias(null);
        launchNotificacion({
            notifMessage: <p>Obteniendo info de la carrera</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'GET'
        };
        fetch(`http://localhost:3005/api/v1/publico/carreras/info?codigoCarrera=${encodeURIComponent(codigoCarrera)}`, requestOptions)
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
                setMaterias(data);
                launchNotificacion({
                    notifMessage: '',
                    notifType: '',
                    state: false
                })
            }).catch(error => { 
                launchNotificacion({
                    notifMessage: <>
                                    <p>No se pudo obtener la info debido al siguiente error</p>
                                    <h4>{error.message}</h4>
                                  </>,
                    notifType: 'ERROR',
                    state: false
                })
            });;
    };

    useEffect(()=>{getCarreras()},[]);

    return(
        <>
            <div className="espacioRojo">Carreras de pregrado y grado</div>
            <div>
                <ul className="menuHorizontalColorido">
                    {carreras['data']?.map((element, id) => {
                        return(
                            <li key={id} className={'Color'+parseInt(id+1%7)}  onClick={()=>{getMaterias(element.codigo)}}><NavLink to={'/carreras/?selected='+id}><p>{element.carrera}</p></NavLink></li>
                        )
                    })}
                </ul>
            </div>
            <Content /*className={'Color'+(parseInt(query.get('selected'))+1%7)}*/>
                 {carreras['data']?.[query.get('selected')] &&
                     <>
                        <h1 style={{marginTop:'5px',marginBottom:'0px'}}>{carreras['data']?.[query.get('selected')]?.carrera}</h1>
                        <h2>Modalidad:{' '+carreras['data']?.[query.get('selected')]?.modalidad}</h2>
                        <h3 style={{marginBottom:'8px'}}>Listado de materias de la Carrera</h3>
                        <div style={{display:'flex',width:'100%',justifyContent:'center',marginBottom:'100px'}}>
                            {materias && <AdaptativeTable tableData={materias}/>}
                        </div>
                    </>
                }
            </Content>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    )
}

export default Carreras;