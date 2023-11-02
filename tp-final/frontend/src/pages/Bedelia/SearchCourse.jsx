import { useContext, useState } from "react";
import { AdaptativeTable } from "../../components/AdaptativeTable";
import { Notification } from "../../components/Notifications";
import CareerSelect from "./CareerSelect";
import Modal from "../../components/Modal";
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from "../../components/UserContext";

export default function SearchCourse(){
    const {userData } = useContext(UserContext);

    const [data, setData] = useState();

    const [estadoModal, setEstadoModal] = useState(false);

    const[valorDeBusqueda, setValorDeBusqueda] = useState({idCarrera:'',nombreMateria:''});

    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const [formData, setFormData] = useState({
        idMateria: 0,
        nombre: "",
        horasSemanales: 0,
        tipoMateria: 0,
        idCarrera: 0
    });

    const handleChangeValorDeBusqueda = (e) => {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...valorDeBusqueda,
          [name]: value,
        };
        setValorDeBusqueda(newValues);
        console.log(valorDeBusqueda);
    }

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...formData,
          [name]: value,
        };
        setFormData(newValues);
    }
    
    const getCourses = (notificateWait=false) => {
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${userData?.token}`}
        };
        if(notificateWait){
            launchNotificacion({
                notifMessage: <p>Obteniendo lista de materias</p>,
                notifType: 'WAIT',
                state: true
            })
        }
        fetch(`http://localhost:3005/api/v1/materia/lookup?idCarrera=${encodeURIComponent(valorDeBusqueda.idCarrera)}&nombreMateria=${encodeURIComponent(valorDeBusqueda.nombreMateria)}`, requestOptions)
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
                if(notificateWait){
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
    }

    const deleteCourse = (idMateria) =>{
        launchNotificacion({
            notifMessage: <p>Guardando modificaciones</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify({idMateria: idMateria})
        };
        fetch(`http://localhost:3005/api/v1/materia/delete`,requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = data;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                launchNotificacion({
                    notifMessage: <><p>Los cambios fueron guardados de forma correcta.</p><h3>La materia esta marcada ahora como inactiva</h3></>,
                    notifType: 'OK',
                    state: true
                })
                getCourses(false);
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

    const editCourse = () =>{
        launchNotificacion({
            notifMessage: <p>Guardando modificaciones</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${userData?.token}`
                },
                body: JSON.stringify(formData)
        };
        fetch(`http://localhost:3005/api/v1/materia/edit`,requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = data;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                if(data.status === 'OK'){
                    launchNotificacion({
                        notifMessage: <><p>Los cambios fueron guardados de forma correcta.</p></>,
                        notifType: 'OK',
                        state: true
                    })
                    getCourses(false);
                }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        editCourse();
        setEstadoModal(false);
    }

    const handleReset = () => {
        setEstadoModal(false);
    }

    const callbackEditable = (e) => {
        setFormData({
            idMateria: parseInt(e['idMateria']),
            nombre: e['Nombre'],
            horasSemanales: parseInt(e['Hs. Sem.']),
            tipoMateria: parseInt(e['Tipo']),
            idCarrera: parseInt(e['idCarrera'])
        });
        setEstadoModal(true);
    }

    const callbackDeletable = (element) => {
        launchNotificacion({
            notifMessage: <>
                            <p>Esta realmente seguro que desea eliminar la Materia?</p>
                            <h3>La accion no se podra deshacer</h3>
                            <div className='WARNPromtLine'>
                                <button onClick={()=>{deleteCourse(element.idMateria); launchNotificacion({})}}><h4>Confirmar</h4></button>
                                <button onClick={()=>{launchNotificacion({})}}><h4>Cancelar</h4></button>
                            </div>
                          </>,
            notifType: 'WARN',
            state: true
        })
        // deleteCareer(e.id)
    }

    const limpiarFormulario = () => {
        setFormData({idCarrera:'',nombreMateria:''});
        setData();
    }

    return(
        <ProtectedElement mustBeBedel={true}>
            <div className="moduleContent">
                <fieldset>
                    <legend>Materias -&gt; Buscar Materias</legend>
                    <div className='cuadroBusqueda'>
                        <div className="dataLine">
                            <label className="dataTitle" htmlFor="idCarrera">Carrera:</label>
                            <CareerSelect callbackSelected={handleChangeValorDeBusqueda} name={'idCarrera'} value={valorDeBusqueda.idCarrera}/>
                                &nbsp; {/* Esto esta mal!!! */}
                            <label className="dataTitle" htmlFor="nombreMateria">Nombre de Materia:</label>
                            <input name="nombreMateria" className="dataEntry" autoFocus placeholder="Ingrese Nombre para buscar" value={valorDeBusqueda.nombreMateria} onChange={handleChangeValorDeBusqueda}></input>
                            <button className="searchButton" type='button' onClick={getCourses}></button>
                        </div>
                    </div>
                    <AdaptativeTable tableData={data?data:{data: []}}  callbackSelectable={callbackSelectable} callbackEditable={callbackEditable} callbackDeletable={callbackDeletable} style={{width:'100%'}}/>
                    {data && <button className="botonComun" onClick={limpiarFormulario}>Limpiar</button>}
                </fieldset>
            </div>
            <Modal title={'Editar Carrera'} state={estadoModal} changeState={setEstadoModal}>
                <>
                    <div className="moduleContent">
                        <form onSubmit={handleSubmit} onReset={handleReset}>
                            <fieldset>
                                <legend>Materias -&gt; Editar Materia</legend>
                                <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre:</label><input name="nombre" autoFocus="" required="" className="dataEntry" value={formData.nombre} onChange={handleChange}/></div>
                                <div className="dataLine"><label className="dataTitle" htmlFor="tipoMateria">Tipo:</label>
                                    <select name="tipoMateria" className="dataEntry" value={formData.tipoMateria} onChange={handleChange}>
                                        <option value={0}>Cuatrimestral</option>
                                        <option value={1}>Anual</option>
                                    </select>
                                </div>
                                <div className="dataLine"><label className="dataTitle" htmlFor="horasSemanales">Hs. Semanales:</label><input name="horasSemanales" required="" className="dataEntry" value={formData.horasSemanales} onChange={(e) => !isNaN(e.target.value) ? handleChange(e) : null}/></div>
                                <div className="dataLine"><label className="dataTitle" htmlFor="idCarrera">Carrera:</label>
                                <CareerSelect callbackSelected={handleChange} name={'idCarrera'} value={formData.idCarrera}/>
                                </div>
                                <div>
                                    <button className="botonComun" type="submit">Guardar</button>
                                    <button className="botonComun" type="reset">Cancelar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
                </>
            </Modal>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </ProtectedElement>
    )
}