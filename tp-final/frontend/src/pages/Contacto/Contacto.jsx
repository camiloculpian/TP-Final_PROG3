import React, { useState } from 'react';

import Modal from '../../components/Modal';
import Content from '../../layouts/Content';
function Contacto(props) {
    const [estadoModal, cambiarEstadoModal] = useState(false);
    
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData })
        };
        fetch('http://localhost:3005/contacto', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                return data;
            }).then(data =>{
                //ACA MOSTRAR QUE TODO SALIO OK!
                alert(data['respuesta']);
            }).catch(error => {
                alert(error);
                //ACA MOSTRAR QUE TODO SALIO MAL!
                console.error('There was an error!', error);
            });
        setFormData({nombre:"",email:"",mensaje:""});
        cambiarEstadoModal();
    }
    
    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        const newValues = {
          ...formData,
          [name]: value,
        };
        setFormData(newValues);
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
                            <h3 className="celeste">Correos Electrónicos Institucionales</h3>
                            <section className="contenedorDeItems">
                                <div className="item contenidoConMargenChico">
                                    <h4 className="celeste contenidoCentrado">Secretaría de Extensión Universitaria</h4>
                                    <p className="contentWithoutMargin">informes.fcad@uner.edu.ar</p>
                                </div>
                                <div className="item contenidoConMargenChico">
                                    <h4 className="celeste contenidoCentrado">Oficina de Ciencia y Técnica</h4>
                                    <p className="contentWithoutMargin">oficinacyt.fcad@uner.edu.ar</p>
                                </div>
                                <div className="item contenidoConMargenChico">
                                    <h4 className="celeste contenidoCentrado">Oficina de Becas</h4>
                                    <p className="contentWithoutMargin">estudiantes.fcad@uner.edu.ar</p>
                                </div>
                                <div className="item contenidoConMargenChico">
                                    <h4 className="celeste contenidoCentrado">Oficina de Pasantías</h4>
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
            <Modal title={'Fromulario de Contacto'} state={estadoModal} changeState={() => {cambiarEstadoModal(); setFormData({nombre:"",email:"",mensaje:""});}}>
                <div className="module-content" id="modulo_registrar_inscripcion">
                        <form onSubmit={handleSubmit} method='POST'> 
                            <fieldset>
                                <legend>'Realizar Consulta'</legend>
                                <div className="dataLine">
                                    <label className="dataTitle" htmlFor="nombre">Apellido y Nombres:</label>
                                    <input name="nombre" className="dataEntry" id="nombre" autoFocus placeholder="Apellido y Nombres" value={formData.nombre} onChange={handleChange}></input>
                                </div>
                                <div className="dataLine">
                                    <label className="dataTitle" htmlFor="email">e-m@il:</label>
                                    <input name="email" className="dataEntry" id="email" placeholder="...@..." value={formData.email} onChange={handleChange}></input>
                                </div>
                                <div className="dataLine"> 
                                    <textarea name='mensaje' id='mensaje' placeholder='Consulta...' value={formData.mensaje} onChange={handleChange}></textarea>
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