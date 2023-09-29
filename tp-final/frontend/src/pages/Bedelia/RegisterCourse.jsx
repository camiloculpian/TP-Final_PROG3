import CareerSelect from "./CareerSelect";

export default function CreateCourse(){
    return(
    <>
        <div className="module-content" id="modulo_registrar_materia">
            <form>
                <fieldset>
                    <legend>Materias -&gt; Agregar Materia</legend>
                    <div className="dataLine"><label className="dataTitle" htmlFor="nombreMateria">Nombre:</label><input name="nombreMateria" autoFocus="" required="" className="dataEntry" /></div>
                    <div className="dataLine"><label className="dataTitle" htmlFor="tipoMateria">Tipo:</label>
                        <select name="tipoMateria" required="" className="dataEntry">
                            <option>Cuatrimestral</option>
                            <option>Anual</option>
                        </select>
                    </div>
                    <div className="dataLine"><label className="dataTitle" htmlFor="hsSemanales">Hs. Semanales:</label><input name="hsSemanales" required="" className="dataEntry" /></div>
                    <div className="dataLine"><label className="dataTitle" htmlFor="CARRERA">Carrera:</label>
                    <CareerSelect callbackSelected={()=>{}}/>
                    </div>
                    <div>
                        <button className="botonComun" id="submit">Agregar</button>
                        <button className="botonComun" type="reset">Cancelar</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </>
    );
}