import { useState } from "react";
import CareerSelect from "./CareerSelect";
import { Notification } from "../../components/Notifications";

export default function CreateCourse(){
    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    });
    const [formData, setFormData] = useState({
        nombre: "",
        horasSemanales: 0,
        tipoMateria: 0,
        idCarrera: 1
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        launchNotificacion({
            notifMessage: <p>Agregando Materia</p>,
            notifType: 'WAIT',
            state: true
        })
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch('http://localhost:3005/api/v1/materia/add', requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    if(data['status']==='OK'){
                        setFormData({
                            nombre: "",
                            horasSemanales: 0,
                            tipoMateria: 0,
                            idCarrera: 1
                        });
                    }
                    launchNotificacion({
                        notifMessage: <p>{data['message']}</p>,
                        notifType: data['status'],
                        state: true
                    });
                }).catch(error => { 
                    launchNotificacion({
                        notifMessage:
                                    <>
                                        <p>NO se pudo añadir la Materia</p>
                                        <h4>{error.message}</h4>
                                    </>,
                        notifType: 'ERROR',
                        state: true
                    });
                });
    }

    const handleReset = () => {
        setFormData({
            nombre: "",
            horasSemanales: 0,
            tipoMateria: 0,
            idCarrera: 1
        });
    }

    return(
        <>
            <div className="moduleContent">
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <fieldset>
                        <legend>Materias -&gt; Agregar Materia</legend>
                        <div className="dataLine"><label className="dataTitle" htmlFor="nombre">Nombre:</label><input name="nombre" autoFocus="" required="" className="dataEntry" value={formData.nombre} onChange={handleChange}/></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="tipoMateria">Tipo:</label>
                            <select name="tipoMateria" required="" className="dataEntry" value={formData.tipoMateria} onChange={handleChange}>
                                <option value={0}>Cuatrimestral</option>
                                <option value={1}>Anual</option>
                            </select>
                        </div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="horasSemanales">Hs. Semanales:</label><input name="horasSemanales" required="" className="dataEntry" value={formData.horasSemanales} onChange={(e) => !isNaN(e.target.value) ? handleChange(e) : null}/></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="CARRERA">Carrera:</label>
                        <CareerSelect callbackSelected={handleChange} name={'idCarrera'} selected={formData.idCarrera}/>
                        </div>
                        <div>
                            <button className="botonComun" type="submit">Agregar</button>
                            <button className="botonComun" type="reset">Cancelar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
        </>
    );
}