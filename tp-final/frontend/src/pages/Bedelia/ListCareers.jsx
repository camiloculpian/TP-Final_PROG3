import { useEffect, useState } from "react";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { Notification } from "../../components/Notifications";
import Modal from "../../components/Modal";


export default function ListCareers(){
    // ACA EL FETCH DE LOS DATOS
    const [data, setData] = useState();

    const [estadoModal, setEstadoModal] = useState(false);

    const [formData, setFormData] = useState({
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
    const getCarres = () => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        };
        launchNotificacion({
            notifMessage: <p>Obteniendo lista de carreras</p>,
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
                console.log(data);
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
            credentials: 'include',
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
        setFormData({
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
                    <AdaptativeTable tableData={data?data:{data: []}}  callbackSelectable={callbackSelectable} callbackEditable={callbackEditable} callbackDeletable={callbackDeletable}/>
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
            <Modal title={'Editar Carrera'} state={estadoModal} changeState={setEstadoModal}>
                <div className="moduleContent" style={{padding:'20px'}}>
                    <form /*onSubmit={handleSubmit}*/>
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
        </>
    )
}