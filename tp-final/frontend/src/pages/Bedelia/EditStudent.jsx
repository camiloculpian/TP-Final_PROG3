import CountrySelect from '../../components/CountrySelect';
import Modal from '../../components/Modal';
import { useState } from "react";
import SearchStudent from './SearchStudent';

function EditStudent(){
    const [estadoModal, cambiarEstadoModal] = useState(false);

    const setReturnStudent = (student) =>{
        // en student tengo el estudiante sobre el que necesito trabajar....
        console.log(student);
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

            <Modal title={'Buscar Estudiante'} state={estadoModal} changeState={cambiarEstadoModal}>
                <SearchStudent returnStudent={setReturnStudent}/>
            </Modal>
        </>
    );
}

export default EditStudent;