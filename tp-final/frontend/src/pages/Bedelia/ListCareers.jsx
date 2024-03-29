import { useCallback, useContext, useEffect, useState } from "react";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { Notification } from "../../components/Notifications";
import Modal from "../../components/Modal";
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from "../../components/UserContext";


export default function ListCareers(){
    const {userData } = useContext(UserContext);
    const [data, setData] = useState();

    const [estadoModal, setEstadoModal] = useState(false);

    const [formData, setFormData] = useState({
        idCarrera : 0,
        nombre: "",
        modalidad: 0,
        activo: 1
    });
    const handleChange = (e) => {
        console.log(e.target.value);
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...formData,
          [name]: value,
        };
        setFormData(newValues);
    }

    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
    const getCarres = useCallback((notificationWait=true) => {
        if(notificationWait){
            launchNotificacion({
                notifMessage: <p>Obteniendo lista de carreras</p>,
                notifType: 'WAIT',
                state: true
            });
        }
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${userData?.token}`}
        };
        fetch('http://localhost:3005/api/v1/carrera/lookup', requestOptions)
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
                setData(data);
                if(notificationWait)
                {
                    launchNotificacion({
                        notifMessage: '',
                        notifType: '',
                        state: false
                    })
                }
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
    }, [userData?.token]);

    useEffect(()=>{getCarres() },[getCarres]);

    const deleteCareer = (idCarrera) =>{
        launchNotificacion({
            notifMessage: <p>Guardando modificaciones</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify({idCarrera: idCarrera})
        };
        fetch(`http://localhost:3005/api/v1/carrera/delete`,requestOptions)
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
                launchNotificacion({
                    notifMessage: <><p>Los cambios fueron guardados de forma correcta.</p><h3>La carrera esta marcada ahora como inactiva</h3></>,
                    notifType: 'OK',
                    state: true
                })
                getCarres(false);
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

    const editCareer = () =>{
        launchNotificacion({
            notifMessage: <p>Guardando modificaciones</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(formData)
        };
        fetch(`http://localhost:3005/api/v1/carrera/edit`,requestOptions)
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
                launchNotificacion({
                    notifMessage: data.message,
                    notifType: data.status,
                    state: true
                })
                getCarres(false);
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
    }

    const callbackEditable = (e) => {
        setFormData({
            idCarrera : e.idCarrera,
            nombre: e.Nombre,
            modalidad : e.Modalidad
        });
        setEstadoModal(true);
    }

    const callbackDeletable = (element) => {
        launchNotificacion({
            notifMessage: <>
                            <p>Esta realmente seguro que desea eliminar la Carrera?</p>
                            <h3>La accion no se podra deshacer</h3>
                            <div className='WARNPromtLine'>
                                <button onClick={()=>{deleteCareer(element.idCarrera); launchNotificacion({})}}><h4>Confirmar</h4></button>
                                <button onClick={()=>{launchNotificacion({})}}><h4>Cancelar</h4></button>
                            </div>
                          </>,
            notifType: 'WARN',
            state: true
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editCareer();
        setEstadoModal(false);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setEstadoModal(false);
    }

    return(
        <ProtectedElement mustBeBedel={true}>
            <div className="moduleContent">
                <fieldset>
                    <legend>Carreras -&gt; Listar Carreras</legend>
                    <AdaptativeTable tableData={data?data:{data: []}}  callbackSelectable={callbackSelectable} callbackEditable={callbackEditable} callbackDeletable={callbackDeletable}/>
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
            <Modal title={'Editar Carrera'} state={estadoModal} changeState={setEstadoModal}>
                <div className="moduleContent" style={{padding:'20px'}}>
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <fieldset>
                            {/* <legend>Carreras -&gt; Editar Carrera</legend> */}
                            <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre Carrera:</label><input name="nombre" required="" className="dataEntry"value={formData.nombre} onChange={handleChange}/></div>
                            <div className="dataLine">
                                <label className="dataTitle" htmlFor="modalidad">Modalidad</label>
                                <select name="modalidad" required="" className="dataEntry" value={formData.modalidad} onChange={handleChange}>
                                    <option value={0}>Presencial</option>
                                    <option value={1}>Virtual</option>
                                </select>
                            </div>
                                <div><button className="botonComun" type="submit">Guardar</button>
                                <button className="botonComun" type="reset">Cancelar</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </Modal>
        </ProtectedElement>
    )
}