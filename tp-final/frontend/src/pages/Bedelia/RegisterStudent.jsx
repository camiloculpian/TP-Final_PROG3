import { useState } from "react";
import CountrySelect from "../../components/CountrySelect";
import './Bedelia.css'
import { Notification } from "../../components/Notifications";
function RegisterStudent(){

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
        nacionalidad: "56",
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
        var formBody = [];
        for (var property in formData) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formData[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: formBody
        };
        fetch('http://localhost:3005/api/v1/estudiante/add', requestOptions)
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
    return (
        <>
            <div className="moduleContent">
                <fieldset>
                    <legend>Estudiantes - Añadir Estudiante</legend>
                    <form onSubmit={handleSubmit} method='POST'> 
                        <div className="dataLine"><label className="dataTitle" htmlFor="apellido">Apellido:</label><input name="apellido" autoFocus required className="dataEntry" value={formData.apellido} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre:</label><input name="nombre" required className="dataEntry" value={formData.nombre} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="dni">DNI:</label><input name="dni" required minLength="7" maxLength="8" className="dataEntry" value={formData.dni} onChange={(e) => !isNaN(e.target.value) ? handleChange(e) : null}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="fechaNacimiento">Fecha Nacimiento:</label><input name="fechaNacimiento" type="date" required className="dataEntry" value={formData.fechaNacimiento} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nacionalidad">Nacionalidad:</label>
                            <CountrySelect callbackSelected={handleChange} name={'nacionalidad'} defaultSelected={formData.nacionalidad}/>
                        </div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="celular">Teléfono:</label><input name="celular" type="tel" required className="dataEntry" value={formData.celular} onChange={handleChange}></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="correoElectronico">e-m@il:</label><input name="correoElectronico" type="email" required className="dataEntry" value={formData.correoElectronico} onChange={handleChange}></input></div>
                        <div>
                            <button type="submit" className="botonComun">Agregar Estudiante</button>
                            <button type="cancel" className="botonComun">Cancelar</button>
                        </div>
                    </form>
                </fieldset>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    );
}

export default RegisterStudent;