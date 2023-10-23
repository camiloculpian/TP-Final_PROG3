import './Bedelia.css'
import '../../components/Notifications.css'
import CountrySelect from '../../components/CountrySelect';
import Modal from '../../components/Modal';
import { useState } from "react";
import SearchStudent from './SearchStudent';
import { Notification } from '../../components/Notifications';

function DeleteStudent(){
    const [estadoModal, cambiarEstadoModal] = useState(false);

    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const setReturnStudent = (student) =>{
        cambiarEstadoModal(false);
        setFormData(student);
    }

    const [formData, setFormData] = useState({
        idEstudiante: "",
        apellido: "",
        nombre: "",
        dni: "",
        fechaNacimiento: "",
        nacionalidad: 5,
        correoElectronico: "",
        celular: "",
        foto: "",
    });

    // const handleChange = (e) => {
    //     const { target } = e;
    //     const { name, value } = target;
    //     const newValues = {
    //       ...formData,
    //       [name]: value,
    //     };
    //     setFormData(newValues);
    // }

    const deleteStudent = () =>{
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
                body: JSON.stringify(formData)
        };
        fetch(`http://localhost:3005/api/v1/estudiante/delete`,requestOptions)
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
                setFormData({
                    idEstudiante: "",
                    apellido: "",
                    nombre: "",
                    dni: "",
                    fechaNacimiento: "",
                    nacionalidad: 5,
                    correoElectronico: "",
                    celular: "",
                    foto: "",
                });
                launchNotificacion({
                    notifMessage: <><p>Los cambios fueron guardados de forma correcta.</p><h3>El estudiante esta marcado ahora como inactivo</h3></>,
                    notifType: 'OK',
                    state: true
                })
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
    const canecelDeleteStudent = () =>{
        setFormData({
            idEstudiante: "",
            apellido: "",
            nombre: "",
            dni: "",
            fechaNacimiento: "",
            nacionalidad: 5,
            correoElectronico: "",
            celular: "",
            foto: "",
        });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        await launchNotificacion({
            notifMessage: <>
                            <p>Esta realmente seguro que desea eliminar el estudiante?</p>
                            <h3>La accion no se podra deshacer</h3>
                            <div className='WARNPromtLine'>
                                <button onClick={()=>{deleteStudent(); launchNotificacion({})}}><h4>Confirmar</h4></button>
                                <button onClick={()=>{canecelDeleteStudent(); launchNotificacion({})}}><h4>Cancelar</h4></button>
                            </div>
                          </>,
            notifType: 'WARN',
            state: true
        })
    }

    const[valorDeBusqueda, setValorDeBusqueda] = useState('');

    function buscarEstudiante(){
        setFormData({
            idEstudiante: "",
            apellido: "",
            nombre: "",
            dni: "",
            fechaNacimiento: "",
            nacionalidad: 56,
            correoElectronico: "",
            celular: "",
            foto: "",
        });
        if(valorDeBusqueda){
            launchNotificacion({
                notifMessage: <p>Buscando estudiante</p>,
                notifType: 'WAIT',
                state: true
            })
            const requestOptions = {
                method: 'GET',
                credentials: 'include'
            };
            fetch(`http://localhost:3005/api/v1/estudiante/lookup?dni=${encodeURIComponent(valorDeBusqueda)}`, requestOptions)
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
                    if(data['data'][0]){
                        setFormData({
                            idEstudiante: data['data'][0]['idEstudiante'],
                            dni: data['data'][0]['DNI'],
                            nombre: data['data'][0]['Apellido'],
                            apellido: data['data'][0]['Nombre'],
                            fechaNacimiento: data['data'][0]['Fecha Nac.'],
                            nacionalidad: data['data'][0]['idNacionalidad'],
                            correoElectronico: data['data'][0]['e-m@il'],
                            celular: data['data'][0]['Celular']
                        });
                        launchNotificacion({
                            notifMessage: '',
                            notifType: '',
                            state: false
                        })
                    }else{
                        launchNotificacion({
                            notifMessage: 'No existe un estudiante con ese dni',
                            notifType: 'WARN',
                            state: true
                        })
                    }
                }).catch(error => { 
                    launchNotificacion({
                        notifMessage: <>
                                        <p>No se pudo realizar la busqueda debido al siguiente error</p>
                                        <h4>{error.message}</h4>
                                      </>,
                        notifType: 'ERROR',
                        state: false
                    })
                });;
        }else{
            cambiarEstadoModal(true);
        }
    }
    return (
        <>
            <div className="moduleContent">
                <fieldset>
                    <legend>Estudiantes -&gt; Elimiar Estudiante</legend>
                    <div className='cuadroBusquedaForDeletion'>
                        <div className="dataLine">
                            <label className="dataTitle" htmlFor="valorDeBusqueda">DNI</label>
                            <input name="valorDeBusqueda" className="dataEntry" autoFocus minLength="7" maxLength="8" placeholder="Ingrese DNI para buscar" value={valorDeBusqueda} onChange={(e)=>setValorDeBusqueda(((!isNaN(e.target.value) ? e.target.value : '')))}></input>
                            <button className="searchButton" type='button' onClick={buscarEstudiante}></button>
                        </div>
                    </div>
                    <form onSubmit={formData.idEstudiante ? handleSubmit:null}  method='PUT' onReset={()=>{setFormData({idEstudiante:"",apellido: "",nombre: "",dni: "",fechaNacimiento: "",nacionalidad: "56",celular: "",correoElectronico: ""});}}>
                        <var id="idEstudiante"></var>
                        <div className="dataLine"><label className="dataTitle" htmlFor="apellido">Apellido:</label><input name="apellido" autoFocus required className="dataEntry" value={formData.apellido} contentEditable={false} readOnly={true} ></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre:</label><input name="nombre" required className="dataEntry" value={formData.nombre} readOnly={true}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="dni">DNI:</label><input name="dni" required minLength="7" maxLength="8" className="dataEntry" value={formData.dni} readOnly={true}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="fechaNacimiento">Fecha Nacimiento:</label><input name="fechaNacimiento" type="date" required className="dataEntry" readOnly={true}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nacionalidad" >Nacionalidad:</label>
                            <CountrySelect callbackSelected={()=>{}} name={'nacionalidad'} selected={formData.nacionalidad} readOnly={true}/>
                        </div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="celular">Teléfono:</label><input name="celular" type="tel" required className="dataEntry" value={formData.celular} readOnly={true}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="correoElectronico">e-m@il:</label><input name="correoElectronico" type="email" required className="dataEntry" value={formData.correoElectronico} readOnly={true}></input></div>
                        <div>
                            <button className="botonComun" id="eliminarEstudiante" type="submit">Eliminar</button>
                            <button className="botonComun" id="cancelarEliminarEstudiante" type="reset">Cancelar</button>
                        </div>
                    </form>
                </fieldset>
            </div>
            <Modal title={'Buscar Estudiante'} state={estadoModal} changeState={cambiarEstadoModal}>
                <SearchStudent returnStudent={setReturnStudent}/>
            </Modal>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    );
}

export default DeleteStudent;