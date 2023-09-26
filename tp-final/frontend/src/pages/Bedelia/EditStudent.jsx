import './Bedelia.css'
import CountrySelect from '../../components/CountrySelect';
import Modal from '../../components/Modal';
import { useState } from "react";
import SearchStudent from './SearchStudent';
import { Notification } from '../../components/Notifications';

function EditStudent(){
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
        nacionalidad: 56,
        correoElectronico: "",
        celular: "",
        foto: "",
    });

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...formData,
          [name]: value,
        };
        setFormData(newValues);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        launchNotificacion({
            notifMessage: <p>Guardando modificaciones</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
        };
        fetch(`http://localhost:3005/api/v1/estudiante/edit`,requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                setFormData({
                    idEstudiante: data['data'][0]['ID'],
                    dni: data['data'][0]['DNI'],
                    nombre: data['data'][0]['Nombre'],
                    apellido: data['data'][0]['Apellido'],
                    fechaNacimiento: data['data'][0]['Fecha Nac.'],
                    nacionalidad: data['data'][0]['Nacionalidad'],
                    correoElectronico: data['data'][0]['e-m@il'],
                    celular: data['data'][0]['Celular'],
                    foto: "",
                });
                launchNotificacion({
                    notifMessage: 'Los cambios fueron guardados de forma correcta.',
                    notifType: 'OK',
                    state: true
                })
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
            };
            fetch(`http://localhost:3005/api/v1/estudiante/lookup?dni=${encodeURIComponent(valorDeBusqueda)}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    if(data['data'][0]){
                        setFormData({
                            idEstudiante: data['data'][0]['ID'],
                            dni: data['data'][0]['DNI'],
                            nombre: data['data'][0]['Apellido'],
                            apellido: data['data'][0]['Nombre'],
                            fechaNacimiento: data['data'][0]['Fecha Nac.'],
                            nacionalidad: data['data'][0]['Nacionalidad'],
                            correoElectronico: data['data'][0]['e-m@il'],
                            celular: data['data'][0]['Celular'],
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
                                        <p>No se pudo realizar la busqueda debido al siguiente error??????????????</p>
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
                    <legend>Estudiantes -&gt; Editar Estudiante</legend>
                    <div className='cuadroBusqueda'>
                        <div className="dataLine">
                            <label className="dataTitle" htmlFor="valorDeBusqueda">DNI</label>
                            <input name="valorDeBusqueda" className="dataEntry" autoFocus minLength="7" maxLength="8" placeholder="Ingrese DNI para buscar" value={valorDeBusqueda} onChange={(e)=>setValorDeBusqueda(((!isNaN(e.target.value) ? e.target.value : '')))}></input>
                            <button className="searchButton" type='button' onClick={buscarEstudiante}></button>
                        </div>
                    </div>
                    <form onSubmit={formData.idEstudiante ? handleSubmit:null}  method='PUT'>
                        <var id="idEstudiante"></var>
                        <div className="dataLine"><label className="dataTitle" htmlFor="apellido">Apellido:</label><input name="apellido" autoFocus required className="dataEntry" value={formData.apellido} onChange={formData.idEstudiante ? handleChange:()=>{}}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre:</label><input name="nombre" required className="dataEntry" value={formData.nombre} onChange={formData.idEstudiante ? handleChange:()=>{}}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="dni">DNI:</label><input name="dni" required minLength="7" maxLength="8" className="dataEntry" value={formData.dni} onChange={(e) => !isNaN(e.target.value)&&formData.idEstudiante?handleChange(e):()=>{}}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="fechaNacimiento">Fecha Nacimiento:</label><input name="fechaNacimiento" type="date" required className="dataEntry" value={formData.fechaNacimiento} onChange={formData.idEstudiante?handleChange:()=>{}}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nacionalidad">Nacionalidad:</label>
                            <CountrySelect callbackSelected={formData.idEstudiante ? handleChange:()=>{}} name={'nacionalidad'} selected={formData.nacionalidad}/>
                        </div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="celular">Teléfono:</label><input name="celular" type="tel" required className="dataEntry" value={formData.celular} onChange={formData.idEstudiante ? handleChange:()=>{}}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="correoElectronico">e-m@il:</label><input name="correoElectronico" type="email" required className="dataEntry" value={formData.correoElectronico} onChange={formData.idEstudiante?handleChange:()=>{}}></input></div>
                        <div>
                            <button className="botonComun" id="editar-estudiante" type="submit">Guardar</button>
                            <button className="botonComun" id="cancelar-editar-estudiante" type="reset" onClick={()=>{setFormData({idEstudiante: "", apellido: "",nombre: "",dni: "",fechaNacimiento: "",nacionalidad: "56",celular: "",correoElectronico: ""});}}>Cancelar</button>
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

export default EditStudent;