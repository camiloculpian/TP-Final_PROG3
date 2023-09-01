import CountrySelect from '../../components/CountrySelect';
import Modal from '../../components/Modal';
import { useRef, useState } from "react";

function EditStudent(props){
    const [estadoModal, cambiarEstadoModal] = useState(false);

    // const [message, setMessage] = useState(props.message)
    const form = useRef(null)
    const searchStudent = e => {
        e.preventDefault()
        const data = new FormData(form.current)
        // fetch('/api', { method: 'POST', body: data })
        //   .then(res => res.json())
        //   .then(json => setMessage(json.message))
        alert(data);
        cambiarEstadoModal();
    }

    return (
        <>
            <div className="moduleContent">
                <fieldset>
                    <legend>Estudiantes - Editar Estudiante</legend>
                    <form>
                        <div className="dataLine">
                            <label className="dataTitle" htmlFor="VALOR_DE_BUSQUEDA">DNI</label>
                            <input name="VALOR_DE_BUSQUEDA" className="dataEntry" id="VALOR_DE_BUSQUEDA" autoFocus maxLength="9" placeholder="Ingrese DNI"></input>
                            <button className="searchButton" type='button' onClick={(cambiarEstadoModal)}></button>
                        </div>
                        <var id="ID_ESTUDIANTE"></var>
                        <div className="dataLine"><label className="dataTitle" htmlFor="APELLIDO">Apellido:</label><input name="APELLIDO" disabled className="dataEntry"id="APELLIDO"></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="NOMBRE">Nombre:</label><input name="NOMBRE" disabled className="dataEntry"id="NOMBRE"></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="DNI">DNI:</label><input name="DNI" disabled className="dataEntry" id="DNI"></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="FECHA_NACIMIENTO">Fecha Nacimiento:</label><input name="FECHA_NACIMIENTO" disabled type="date" className="dataEntry" id="FECHA_NACIMIENTO" required ></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="NACIONALIDAD">Nacionalidad:</label>
                            <CountrySelect />
                        </div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="TELEFONO">Teléfono:</label><input name="TELEFONO" disabled type="tel" className="dataEntry" id="TELEFONO"></input></div>
                        <div className="dataLine"><label className="dataTitle" htmlFor="EMAIL">e-m@il:</label><input name="EMAIL" disabled type="email" className="dataEntry" id="EMAIL"></input></div>
                        <div>
                            <button className="botonComun" id="editar-estudiante" type="button">Guardar</button>
                            <button className="botonComun" id="cancelar-editar-estudiante" type="button">Cancelar</button>
                        </div>
                    </form>
                </fieldset>
            </div>

            <Modal title={''} state={estadoModal} changeState={cambiarEstadoModal}>
                <div className="moduleContent" id="modulo_registrar_inscripcion">
                    <form ref={form} onSubmit={searchStudent}> 
                        <fieldset>
                            <legend>'Busqueda de Estudiante'</legend>
                            <div className="dataLine">
                                <label className="dataTitle" htmlFor="NOMBRE">Buscar por:</label>
                                <select name="CRBUSQUEDA" className="dataEntry" id="NACIONALIDAD">
                                    <option value="DNI" selected>DNI</option>
                                    <option value="APENOMB">Apellido y Nombre</option>
                                </select>
                                <input name="NOMBRE" className="dataEntry" id="NOMBRE" autoFocus></input>
                                <button className="searchButton" type='button' onClick={(cambiarEstadoModal)}></button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default EditStudent;