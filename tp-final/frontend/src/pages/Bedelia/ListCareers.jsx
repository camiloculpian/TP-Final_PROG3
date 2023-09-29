import { useEffect, useState } from "react";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { Notification } from "../../components/Notifications";


export default function ListCareers(){
    // ACA EL FETCH DE LOS DATOS
    const [data, setData] = useState();

    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    const getCarres = () => {
        const requestOptions = {
            method: 'GET',
        };
        launchNotificacion({
            notifMessage: <p>Obteniendo lista de estudiantes</p>,
            notifType: 'WAIT',
            state: true
        })
        fetch('http://localhost:3005/api/v1/carrera/lookup', requestOptions)
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
    };

    useEffect(()=>{getCarres()},[]);

    const deleteCareer = (idCarrera) =>{
        launchNotificacion({
            notifMessage: <p>Guardando modificaciones</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
                },
                body: JSON.stringify({idCarrera: idCarrera})
        };
        fetch(`http://localhost:3005/api/v1/carrera/delete`,requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                launchNotificacion({
                    notifMessage: <><p>Los cambios fueron guardados de forma correcta.</p><h3>La carrera esta marcada ahora como inactiva</h3></>,
                    notifType: 'OK',
                    state: true
                })
                getCarres();
            }).catch(error => { 
                launchNotificacion({
                    notifMessage: <>
                                    <p>No se pudo realizar la solicitud debido al siguiente error</p>
                                    <h4>{error.message}</h4>
                                  </>,
                    notifType: 'ERROR',
                    state: false
                })
            });;
    }


    const callbackSelectable = (e) => {
        //console.log(e);
    }

    const callbackEditable = (e) => {
        console.log(e);
        // e.target.parentElement.parentElement.childNodes.forEach(element => {
        //     element.innerHTML = '<input value={element.value} />';
        // });
    }

    const callbackDeletable = (element) => {
        console.log(element);
        launchNotificacion({
            notifMessage: <>
                            <p>Esta realmente seguro que desea eliminar la Carrera?</p>
                            <h3>La accion no se podra deshacer</h3>
                            <div className='WARNPromtLine'>
                                <button onClick={()=>{deleteCareer(element.ID); launchNotificacion({})}}><h4>Confirmar</h4></button>
                                <button onClick={()=>{launchNotificacion({})}}><h4>Cancelar</h4></button>
                            </div>
                          </>,
            notifType: 'WARN',
            state: true
        })
        // deleteCareer(e.id)
    }
    return(
        <>
            <div className="moduleContent">
                <fieldset>
                    <legend>Carreras -&gt; Listar Carreras</legend>
                    <AdaptativeTable json={data?data:{data: []}}  callbackSelectable={callbackSelectable} callbackEditable={callbackEditable} callbackDeletable={callbackDeletable}/>
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    )
}