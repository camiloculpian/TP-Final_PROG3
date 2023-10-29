import './Statistics.css';
import { ProtectedElement } from "../../components/ProtectedElement";

export default function StatiscticsCareers(){
    return(
        <ProtectedElement mustBeDecano={true}>
            <div className="moduleContent">
                <h3>Esadisticas de las Carreras</h3>
                <div className="statisticsBoxs">
                    <div className="infoBox Color1">
                        <div className="infoBoxTitle">
                            <h4>Titulo de info</h4>
                        </div>
                        <div className="infoBoxContent">
                            <p>info 1:</p>
                            <p>info 2:</p>
                            <p>info 3:</p>
                        </div>
                    </div>
                    <div className="infoBox Color2">
                        <div className="infoBoxTitle">
                            <h4>Titulo de info</h4>
                        </div>
                        <div className="infoBoxContent">
                            <p>info 1:</p>
                            <p>info 2:</p>
                            <p>info 3:</p>
                        </div>
                    </div>
                    <div className="infoBox Color3">
                        <div className="infoBoxTitle">
                            <h4>Titulo de info</h4>
                        </div>
                        <div className="infoBoxContent">
                            <p>info 1:</p>
                            <p>info 2:</p>
                            <p>info 3:</p>
                        </div>
                    </div>
                    <div className="infoBox Color4">
                        <div className="infoBoxTitle">
                            <h4>Titulo de info</h4>
                        </div>
                        <div className="infoBoxContent">
                            <p>info 1:</p>
                            <p>info 2:</p>
                            <p>info 3:</p>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedElement>
    );
}