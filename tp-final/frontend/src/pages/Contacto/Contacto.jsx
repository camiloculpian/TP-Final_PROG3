import React, { useState } from 'react';

import Modal from '../../components/Modal';
import Content from '../../layouts/Content';
import {Notification} from '../../components/Notifications';

function Contacto(props) {
    const [estadoModal, cambiarEstadoModal] = useState(false);

    const [notificationState, launchNotificacion] = useState({
        notifMessage: '',
        notifType: '',
        state: false
    })

    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.nombre!==''&& formData.email !== '' && formData.mensaje!=='')
        {
            launchNotificacion({
                notifMessage: <p>Enviando mensaje</p>,
                notifType: 'WAIT',
                state: true
            })
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            };
            fetch('http://localhost:3005/api/v1/publico/contacto', requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    return data;
                }).then(data =>{
                    launchNotificacion({
                        notifMessage: <p>El mensaje se envio de manera correcta...</p>,
                        notifType: 'OK',
                        state: true
                    })

                }).catch(error => { 
                    launchNotificacion({
                        notifMessage:
                                    <>
                                        <p>El mensaje no pudo ser enviado debido al siguiente error</p>
                                        <h4>{error.message}</h4>
                                    </>,
                        notifType: 'ERROR',
                        state: true
                    })
                });
            setFormData({nombre:"",correo:"",mensaje:""});
            cambiarEstadoModal();
        }else{
            cambiarEstadoModal();
            launchNotificacion({
                notifMessage: <p>Por favor verifique que los campos no esten vacios...</p>,
                notifType: 'WARN',
                state: true
            })
            cambiarEstadoModal(true);
        }
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
            <Notification state={notificationState} onCloseNotificacion={launchNotificacion}/>
            <Modal title={'Fromulario de Contacto'} state={estadoModal} changeState={() => {cambiarEstadoModal(); setFormData({nombre:"",email:"",mensaje:""});}}>
                <div className="module-content" id="modulo_registrar_inscripcion">
                        <form onSubmit={handleSubmit} method='POST'> 
                            <fieldset>
                                <legend>'Realizar Consulta'</legend>
                                <div className="dataLine">
                                    <label className="dataTitle" htmlFor="nombre">Apellido y Nombres:</label>
                                    <input name="nombre" className="dataEntry" autoFocus placeholder="Apellido y Nombres" value={formData.nombre} onChange={handleChange} required></input>
                                </div>
                                <div className="dataLine">
                                    <label className="dataTitle" htmlFor="correo">e-m@il:</label>
                                    <input name="correo" className="dataEntry" placeholder="...@..." value={formData.email} onChange={handleChange} required></input>
                                </div>
                                <div className="dataLine"> 
                                    <textarea name='mensaje' placeholder='Consulta...' value={formData.mensaje} onChange={handleChange} required></textarea>
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