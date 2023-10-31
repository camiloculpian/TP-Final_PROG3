import { useContext, useState } from "react";
import { Notification } from "../../components/Notifications";
import Modal from "../../components/Modal";
import SearchStudent from "./SearchStudent";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from "../../components/UserContext";

export default function ListCareerInscription(){
    const {userData } = useContext(UserContext);
    const [estadoModal, cambiarEstadoModal] = useState(false);

    const setReturnStudent = (student) =>{
        cambiarEstadoModal(false);
        setStudentData(student);
        lookupCareers(student.idEstudiante);
        setFormData({idEstudiante : student.idEstudiante});
    }

    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const [studentData, setStudentData] = useState({});
    const [careerList, setCareerList] = useState({headers :[{}], data: [{}]});
    
    const tableData={
        headers: [{name: `ID`},{name: `DNI`},{name: `Apellido`},{name: `Nombre`},{name: `Fecha Nac.`},{name: `idNac.`},{name: `e-m@il`},{name: `Celular`}],
        data: [studentData]
    };
    
    const [formData, setFormData] = useState({});

    const[valorDeBusqueda, setValorDeBusqueda] = useState('');

    const lookupCareers = (idEstudiante,notificationWait=false) => {
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
        fetch(`http://localhost:3005/api/v1/inscripcion/career/lookup?idEstudiante=${encodeURIComponent(idEstudiante)}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = data;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    setCareerList(data);
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
                                        <p>No se pudo realizar la busqueda debido al siguiente error</p>
                                        <h4>{error.message}</h4>
                                      </>,
                        notifType: 'ERROR',
                        state: false
                    })
                });;
    }

    function buscarEstudiante(){
        if(valorDeBusqueda){
            launchNotificacion({
                notifMessage: <p>Buscando estudiante</p>,
                notifType: 'WAIT',
                state: true
            })
            const requestOptions = {
                method: 'GET',
                headers: {'Authorization': `Bearer ${userData?.token}`}
            };
            fetch(`http://localhost:3005/api/v1/estudiante/lookup?dni=${encodeURIComponent(valorDeBusqueda)}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = data;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    if(data['data'][0]){
                        setReturnStudent({
                            idEstudiante: data['data'][0]['idEstudiante'],
                            dni: data['data'][0]['DNI'],
                            nombre: data['data'][0]['Nombre'],
                            apellido: data['data'][0]['Apellido'],
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

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleReset = () => {
        setStudentData({});
        setFormData({});
    }

    const darDeAlta = (career) => {
        launchNotificacion({
            notifMessage: <p>Registrando Inscripcion</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userData?.token}` },
            body: JSON.stringify({
                idEstudiante:formData.idEstudiante,
                idCarrera:career.idCarrera
            })
        };
        fetch('http://localhost:3005/api/v1/inscripcion/career/add', requestOptions)
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
                    if(data.status==='OK'){
                        lookupCareers(formData.idEstudiante);
                    }
                    launchNotificacion({
                        notifMessage: <p>{data.message}</p>,
                        notifType: data.status,
                        state: true
                    })
                }).catch(error => { 
                    launchNotificacion({
                        notifMessage:
                                    <>
                                        <p>NO se pudo registrar la Inscripcion</p>
                                        <h4>{error.message}</h4>
                                    </>,
                        notifType: 'ERROR',
                        state: true
                    })
                });
    }

    const darDeBaja = (career) => {
        launchNotificacion({
            notifMessage: <p>Eliminando Inscripcion</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userData?.token}` },
            body: JSON.stringify({
                idEstudiante:formData.idEstudiante,
                idCarrera:career.idCarrera
            })
        };
        fetch('http://localhost:3005/api/v1/inscripcion/career/delete', requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = data;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    if(data.status==='OK'){
                        lookupCareers(formData.idEstudiante);
                    }
                    launchNotificacion({
                        notifMessage: <p>{data['message']}</p>,
                        notifType: data['status'],
                        state: true
                    })
                }).catch(error => { 
                    launchNotificacion({
                        notifMessage:
                                    <>
                                        <p>NO se pudo eliminar la Inscripciona</p>
                                        <h4>{error.message}</h4>
                                    </>,
                        notifType: 'ERROR',
                        state: true
                    })
                });
    }

    const handleBaja = async (career) => {
        await launchNotificacion({
            notifMessage: <>
                            <p>Esta realmente seguro que desea eliminar la Inscripcion?</p>
                            <h3>La accion no se podra deshacer</h3>
                            <div className='WARNPromtLine'>
                                <button onClick={()=>{darDeBaja(career); launchNotificacion({})}}><h4>Confirmar</h4></button>
                                <button onClick={()=>{/*handleReset();*/ launchNotificacion({})}}><h4>Cancelar</h4></button>
                            </div>
                          </>,
            notifType: 'WARN',
            state: true
        })
    }

    const handleAlta = async (career) => {
        await launchNotificacion({
            notifMessage: <>
                            <p>Confirme para Inscribir al Usuario en la Carrera selecionada?</p>
                            <div className='INFOPromtLine'>
                                <button onClick={()=>{darDeAlta(career); launchNotificacion({})}}><h4>Confirmar</h4></button>
                                <button onClick={()=>{/*handleReset();*/ launchNotificacion({})}}><h4>Cancelar</h4></button>
                            </div>
                          </>,
            notifType: 'INFO',
            state: true
        })
    }

    return (
        <ProtectedElement mustBeBedel={true}>
            <div className="moduleContent">
                <form onSubmit={handleSubmit} onReset={handleReset}> 
                    <fieldset>
                        <legend>Inscripciones -&gt; Inscripcion a Carreras</legend>
                        <div className='cuadroBusqueda'>
                            <div className="dataLine">
                                <label className="dataTitle" htmlFor="valorDeBusqueda">Buscar Estudiante</label>
                                <input name="valorDeBusqueda" className="dataEntry" autoFocus minLength="7" maxLength="8" placeholder="Ingrese DNI para buscar" value={valorDeBusqueda} onChange={(e)=>setValorDeBusqueda(((!isNaN(e.target.value) ? e.target.value : '')))}></input>
                                <button className="searchButton" type='button' onClick={buscarEstudiante}></button>
                            </div>
                        </div>
                        <AdaptativeTable tableData={tableData}  style={{width:'100%'}}/>
                        {formData.idEstudiante && careerList['headers'] && careerList['data'] &&
                            <>
                            <h4>Listado de Carreras</h4>
                                <table style={{width:'100%'}}>
                                    <thead>
                                        <tr>{
                                                careerList['headers'].map((element, id) => {
                                                    return(<th key={id}>{element.name}</th>);
                                                })
                                            }
                                            <th id='actions'>ACCION</th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        careerList['data'].map((element, id) => {
                                            return(
                                                <tr key={id} >{
                                                    //ACA ESTA EL ERROR
                                                    Object.values(element).map((value, id) => {
                                                        return(<td key={id} >{value}</td>);
                                                    })}
                                                    {element.Inscripto === 'NO' ?<td><button className="alta" onClick={()=>{handleAlta(element)}}>Alta</button></td>:<td><button className="baja" onClick={()=>{handleBaja(element)}}>Baja</button></td>}
                                                </tr>
                                            )
                                        })
                                    }</tbody>
                                </table>
                            </>
                        }
                    </fieldset>
                </form>
                <Modal title={'Buscar Estudiante'} state={estadoModal} changeState={cambiarEstadoModal}>
                    <SearchStudent returnStudent={setReturnStudent}/>
                </Modal>
                <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
            </div>
        </ProtectedElement>
    )
}