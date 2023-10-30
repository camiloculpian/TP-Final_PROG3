import './Statistics.css';
import { ProtectedElement } from "../../components/ProtectedElement";

export default function StatiscticsStudents(){
    return(
        <ProtectedElement mustBeDecano={true}>
            <div className="moduleContent">
                <h3>Esadisticas de los Estudiantes</h3>
                <div className="statisticsBoxs">
                    <div className="infoBox Color1">
                        <div className="infoBoxTitle">
                        <h4>Alumnos Inscriptos</h4>
                        </div>
                        <div className="infoBoxContent">
                            <p>Total:</p>
                            <p>Argentinos:</p>
                            <p>Extranjeros:</p>
                        </div>
                    </div>                    
                </div>
            </div>
        </ProtectedElement>
    );
}