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
                            <label className="dataTitle" for="VALOR_DE_BUSQUEDA">DNI</label>
                            <input name="VALOR_DE_BUSQUEDA" className="dataEntry" id="VALOR_DE_BUSQUEDA" autofocus maxlength="9" placeholder="Ingrese DNI"></input>
                            <button className="searchButton" type='button' onClick={(cambiarEstadoModal)}></button>
                        </div>
                        <var id="ID_ESTUDIANTE"></var>
                        <div className="dataLine"><label className="dataTitle" for="APELLIDO">Apellido:</label><input name="APELLIDO" disabled className="dataEntry"id="APELLIDO"></input></div>
                        <div className="dataLine"><label className="dataTitle" for="NOMBRE">Nombre:</label><input name="NOMBRE" disabled className="dataEntry"id="NOMBRE"></input></div>
                        <div className="dataLine"><label className="dataTitle" for="DNI">DNI:</label><input name="DNI" disabled className="dataEntry" id="DNI"></input></div>
                        <div className="dataLine"><label className="dataTitle" for="FECHA_NACIMIENTO">Fecha Nacimiento:</label><input name="FECHA_NACIMIENTO" disabled type="date" className="dataEntry" id="FECHA_NACIMIENTO" required ></input></div>
                        <div class="dataLine"><label className="dataTitle" for="NACIONALIDAD">Nacionalidad:</label>
                            <select name="NACIONALIDAD" disabled className="dataEntry" id="NACIONALIDAD">
                            </select>
                        </div>
                        <div className="dataLine"><label className="dataTitle" for="TELEFONO">Teléfono:</label><input name="TELEFONO" disabled type="tel" className="dataEntry" id="TELEFONO"></input></div>
                        <div className="dataLine"><label className="dataTitle" for="EMAIL">e-m@il:</label><input name="EMAIL" disabled type="email" className="dataEntry" id="EMAIL"></input></div>
                        <div>
                            <button className="botonComun" id="editar-estudiante" type="button">Guardar</button>
                            <button className="botonComun" id="cancelar-editar-estudiante" type="button">Cancelar</button>
                        </div>
                    </form>
                </fieldset>
            </div>

            <Modal state={estadoModal} changeState={cambiarEstadoModal}>
                <div className="moduleContent" id="modulo_registrar_inscripcion">
                    <form ref={form} onSubmit={searchStudent}> 
                        <fieldset>
                            <legend>'Buscar Estudiante'</legend>
                            <div className="dataLine">
                                <label className="dataTitle" htmlFor="NOMBRE">Apellido y Nombres:</label>
                                <input name="NOMBRE" className="dataEntry" id="NOMBRE" autoFocus placeholder="Apellido y Nombres"></input>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default EditStudent;