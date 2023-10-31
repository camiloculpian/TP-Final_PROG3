import { useContext, useState } from "react";
import { Notification } from "../../components/Notifications";
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from "../../components/UserContext";

export default function RegisterCareer(){
    const {userData } = useContext(UserContext);
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })
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
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        launchNotificacion({
            notifMessage: <p>Agregando Carrera</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userData?.token}` },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:3005/api/v1/carrera/add', requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = data;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    if(data['status']==='OK'){
                        setFormData({
                            nombre: "",
                            modalidad: 0,
                            activo: 1
                        })
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
                                        <p>NO se pudo añadir la Carrera</p>
                                        <h4>{error.message}</h4>
                                    </>,
                        notifType: 'ERROR',
                        state: true
                    })
                });
    }
    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            nombre: "",
            modalidad: 0,
            activo: 1
        })
    }
    return(
        <ProtectedElement mustBeBedel={true}>
            <div className="moduleContent" >
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <fieldset>
                        <legend>Carreras -&gt; Registrar Carrera</legend>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre Carrera:</label><input name="nombre" required={true} className="dataEntry" value={formData.nombre} onChange={handleChange}/></div>
                        <div className="dataLine">
                            <label className="dataTitle" htmlFor="modalidad">Modalidad</label>
                            <select name="modalidad" required="" className="dataEntry" value={formData.modalidad} onChange={handleChange}>
                                <option value={0}>Presencial</option>
                                <option value={1}>Virtual</option>
                            </select>
                        </div>
                        <div>
                            <button className="botonComun" type="submit">Agregar</button>
                            <button className="botonComun" type="reset">Cancelar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </ProtectedElement>
    )
}