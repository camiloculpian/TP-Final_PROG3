import CountrySelect from "../../components/CountrySelect";

function RegisterStudent(){
    return (
        <div className="moduleContent">
            <fieldset>
                <legend>Estudiantes - Añadir Estudiante</legend>
                <form> 
                    <div className="dataLine"><label className="dataTitle" for="APELLIDO">Apellido:</label><input name="APELLIDO" autofocus required className="dataEntry"id="APELLIDO"></input></div>
                    <div className="dataLine"><label className="dataTitle" for="NOMBRE">Nombre:</label><input name="NOMBRE" required className="dataEntry"id="NOMBRE"></input></div>
                    <div className="dataLine"><label className="dataTitle" for="DNI">DNI:</label><input name="DNI" required minlength="9" maxlength="9" className="dataEntry" id="DNI"></input></div>
                    <div className="dataLine"><label className="dataTitle" for="FECHA_NACIMIENTO">Fecha Nacimiento:</label><input name="FECHA_NACIMIENTO" type="date" required className="dataEntry" id="FECHA_NACIMIENTO"></input></div>
                    <div className="dataLine"><label class="dataTitle" for="NACIONALIDAD">Nacionalidad:</label>
                        <CountrySelect />
                    </div>
                    <div className="dataLine"><label class="dataTitle" for="TELEFONO">Teléfono:</label><input name="TELEFONO" type="tel" required className="dataEntry" id="TELEFONO"></input></div>
                    <div className="dataLine"><label class="dataTitle" for="EMAIL">e-m@il:</label><input name="EMAIL" type="email" required className="dataEntry" id="EMAIL"></input></div>
                    <div>
                        <button type="submit" className="botonComun">Agregar Estudiante</button>
                        <button type="cancel" className="botonComun">Cancelar</button>
                    </div>
                </form>
            </fieldset>
        </div>
    );
}

export default RegisterStudent;