const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) =>{
    const { nombre, email, mensaje } = req.body['formData'];
    
    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utils/handlebars/plantilla.hbs'), 'utf8');
    
    const correoTemplate = handlebars.compile(plantillaHds2);
  
    // Datos de la plantilla
    const datos = {
      nombre: nombre,
      correo: email,
      mensaje: mensaje
    };
  
    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);

    // console.log(correoHtml);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.CLAVE
        }
    })

    const opciones = {
        from: email,
        to: 'ingo.prog3@gmail.com',
        subject: '___CONTACTO___' + email,
        html: mensaje
    }

    transporter.sendMail(opciones, (error, info) => {
        if (error) {
            console.log('error -> ', error);
            const respuesta = 'El mensaje no ha sido enviado...';
            res.json({ respuesta });
        } else {
            console.log(info);
            const respuesta = 'El mensaje se ha enviado de forma correcta...';
            res.json({ respuesta });
        }
    })
}