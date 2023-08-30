import React, {useRef, useState} from 'react';

import Modal from '../../components/Modal';
import Content from '../../layouts/Content';
function Contacto(props) {
    const [estadoModal, cambiarEstadoModal] = useState(false);

    // const [message, setMessage] = useState(props.message)
    const form = useRef(null)
    const submit = e => {
        e.preventDefault()
        const data = new FormData(form.current)
        // fetch('/api', { method: 'POST', body: data })
        //   .then(res => res.json())
        //   .then(json => setMessage(json.message))
        alert('Mensaje de: '+data.get('NOMBRE')+'\ne-m@il: '+data.get('EMAIL')+'\nMensaje: '+data.get('MESSAGE'));
        cambiarEstadoModal();
    }
    return(
        <> 
            <Content>
                <nav className="contenido">
                    <main className="contenidoPrincipal">
                        <nav className="contenido contenidoPrincipal">
                            <div className="contenidoCentrado">
                                <h2>Informacion de Contacto</h2>
                            </div>
                            <h3  className="celeste">Correos Electrónicos Institucionales</h3>
                            <section className="contenedorDeItems">
                                <div className="item contenidoConMargenChico">
                                    <h4  className="celeste contenidoCentrado">Secretaría de Extensión Universitaria</h4>
                                    <p className="contentWithoutMargin">informes.fcad@uner.edu.ar</p>
                                </div>
                                <div className="item contenidoConMargenChico">
                                    <h4  className="celeste contenidoCentrado">Oficina de Ciencia y Técnica</h4>
                                    <p className="contentWithoutMargin">oficinacyt.fcad@uner.edu.ar</p>
                                </div>
                                <div className="item contenidoConMargenChico">
                                    <h4  className="celeste contenidoCentrado">Oficina de Becas</h4>
                                    <p className="contentWithoutMargin">estudiantes.fcad@uner.edu.ar</p>
                                </div>
                                <div className="item contenidoConMargenChico">
                                    <h4  className="celeste contenidoCentrado">Oficina de Pasantías</h4>
                                    <p className="contentWithoutMargin">pasantias.fcad@uner.edu.ar</p>
                                </div>
                            </section>
                            <h2 className="celeste">Teléfonos Directos</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sector</th>
                                        <th>Numero</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Operadora</td>
                                        <td>423 1400</td>
                                    </tr>
                                    <tr>
                                        <td>Decano</td>
                                        <td>423 1402</td>
                                    </tr>
                                    <tr>
                                        <td>Vicedecano</td>
                                        <td>423 1403</td>
                                    </tr>
                                    <tr>
                                        <td>Secretaría de Extensión Universitaria</td>
                                        <td>423 1404</td>
                                    </tr>
                                    <tr>
                                        <td>Gabinete Administración de Redes</td>
                                        <td>423 1406</td>
                                    </tr>
                                    <tr>
                                        <td>Gabinete de Difusión</td>
                                        <td>423 1407</td>
                                    </tr>
                                    <tr>
                                        <td>Gabinete de Investigación Sistemas</td>
                                        <td>423 1408</td>
                                    </tr>
                                    <tr>
                                        <td>Gabinete humanidades</td>
                                        <td>423 1409</td>
                                    </tr>
                                    <tr>
                                        <td>FAX</td>
                                        <td>423 1410</td>
                                    </tr>
                                    <tr>
                                        <td>Secretaría Académica</td>
                                        <td>423 1411</td>
                                    </tr>
                                </tbody>
                            </table>
                        </nav>
                        
                    </main>
                    <button className='botonComun' onClick={(cambiarEstadoModal)}>Contactar</button>
                </nav>
            </Content>
            <Modal title={'Fromulario de Contacto'} state={estadoModal} changeState={cambiarEstadoModal}>
                <div className="module-content" id="modulo_registrar_inscripcion">
                        <form ref={form} onSubmit={submit}> 
                            <fieldset>
                                <legend>'Realizar Consulta'</legend>
                                <div className="dataLine">
                                    <label className="dataTitle" htmlFor="APE_NOMB">Apellido y Nombres:</label>
                                    <input name="NOMBRE" className="dataEntry" id="NOMBRE" autoFocus placeholder="Apellido y Nombres"></input>
                                </div>
                                <div className="dataLine">
                                    <label className="dataTitle" htmlFor="EMAIL">e-m@il:</label>
                                    <input name="EMAIL" className="dataEntry" id="EMAIL" placeholder="...@..."></input>
                                </div>
                                <div className="dataLine"> 
                                    <textarea name='MESSAGE' id='MESSAGE' placeholder='Consulta'></textarea>
                                </div>
                                <div>
                                    <button type='submit' className="botonComun contentWithoutMargin">Enviar</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
            </Modal>
        </>
    )
}

export default Contacto;