import { useContext, useState } from "react";
import CountrySelect from "../../components/CountrySelect";
import './Bedelia.css'
import { Notification } from "../../components/Notifications";
import { ProtectedElement } from "../../components/ProtectedElement";
import { UserContext } from "../../components/UserContext";

function RegisterStudent(){
    const {userData } = useContext(UserContext);
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const [formData, setFormData] = useState({
        apellido: "",
        nombre: "",
        dni: "",
        fechaNacimiento: "",
        nacionalidad: 5,
        celular: "",
        correoElectronico: "",
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
            notifMessage: <p>Agregando Estudiante</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userData?.token}` },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:3005/api/v1/estudiante/add', requestOptions)
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
                    console.log(data);
                    if(data?.status==='OK'){
                        setFormData({
                            apellido: "",
                            nombre: "",
                            dni: "",
                            fechaNacimiento: "",
                            nacionalidad: 5,
                            celular: "",
                            correoElectronico: "",
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
                                        <p>NO se pudo añadir el estudiante</p>
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
    return (
        <ProtectedElement mustBeBedel={true}>
            <div className="moduleContent">
                <fieldset>
                    <legend>Estudiantes -&gt; Añadir Estudiante</legend>
                    <form onSubmit={handleSubmit} onReset={handleReset} method='POST'> 
                        <div className="dataLine"><label className="dataTitle" htmlFor="apellido">Apellido:</label><input name="apellido" autoFocus required className="dataEntry" value={formData.apellido} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre:</label><input name="nombre" required className="dataEntry" value={formData.nombre} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="dni">DNI:</label><input name="dni" required minLength="7" maxLength="8" className="dataEntry" value={formData.dni} onChange={(e) => !isNaN(e.target.value) ? handleChange(e) : null}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="fechaNacimiento">Fecha Nacimiento:</label><input name="fechaNacimiento" type="date" required className="dataEntry" value={formData.fechaNacimiento} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nacionalidad">Nacionalidad:</label>
                            <CountrySelect callbackSelected={handleChange} name={'nacionalidad'} selected={formData.nacionalidad}/>
                        </div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="celular">Teléfono:</label><input name="celular" type="tel" className="dataEntry" value={formData.celular} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="correoElectronico">e-m@il:</label><input name="correoElectronico" type="email" required className="dataEntry" value={formData.correoElectronico} onChange={handleChange}></input></div>
                        <div>
                            <button type="submit" className="botonComun">Agregar Estudiante</button>
                            <button type="reset" className="botonComun">Cancelar</button>
                        </div>
                    </form>
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </ProtectedElement>
    );
}

export default RegisterStudent;