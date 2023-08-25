import Content from '../../layouts/Content';
function Institucional(){
    return (
        <>
            <Content>
                <div className="contenido">
                    <div className="contenidoPrincipal">
                        <div className="contenidoCentrado "><h2>Informacion Institucional</h2></div>
                        <div className="centered">
                            <h3 className="contenidoConMargenChico">La Facultad de Ciencias de la Administración es una de las nueve Facultades que componen la Universidad Nacional de Entre Ríos (UNER) .</h3>
                            <h3 className="contenidoConMargenChico">Estas unidades académicas, se encuentran en forma descentralizadas y expandidas en la provincia de Entre Ríos. Esta conformación la distingue de las Universidades Nacionales que reúnen todas sus actividades en un mismo núcleo urbano.</h3>
                            <h3 className="contenidoConMargenChico">El Rectorado tiene su sede en la ciudad de Concepción del Uruguay y sus Unidades Académicas se distribuyen de la siguiente manera:</h3>
                        </div>
                    </div>
                </div>
                <nav className="contenido contenidoConMargen">
                    <aside className="menuLateral contenidoConMargenChico">
                        <div className="contenidoConMargenChico">
                            <h3>Concordia:</h3>
                            Facultad de Ciencias de la Administración
                            Facultad de Ciencias de la Alimentación
                        </div>
                        <div className="contenidoConMargenChico">
                            <h3>Concepción del Uruguay:</h3>
                            Facultad de Ciencias de la Salud
                            *Sede Villaguay
                        </div>
                        <div className="contenidoConMargenChico">
                            <h3>Gualeguaychú:</h3>
                            Facultad de Bromatología
                        </div>
                        <div className="contenidoConMargenChico">
                            <h3>Oro Verde:</h3>
                            Facultad de Ciencias Agropecuarias
                            Facultad de Ingeniería
                        </div>
                        <div className="contenidoConMargenChico">
                            <h3>Paraná:</h3>
                            Facultad de Ciencias de la Educación
                            Facultad de Ciencias Económicas
                            Facultad de Trabajo Social
                        </div>
                    </aside>
                    <main className="contenidoPrincipal">
                        <div className="imgMapaUner"></div>
                    </main>
                </nav>
            </Content>
        </>
  );
}

export default Institucional