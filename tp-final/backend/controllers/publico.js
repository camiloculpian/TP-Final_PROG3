const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) =>{
    if(!req.body['nombre']&!req.body['correo']&!req.body['mensaje']){
        const respuesta = 'El mensaje NO ha sido enviado, faltan datos...';
        res.json({ respuesta });
    }else{
        const nombre = req.body['nombre'];
        const email = req.body['correo'];
        const mensaje = req.body['mensaje'];
        
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
            html: correoHtml
        }

        transporter.sendMail(opciones, (error, info) => {
            if (error) {
                const respuesta = 'El mensaje NO ha sido enviado...';
                res.json({ respuesta });
            } else {
                const respuesta = 'El mensaje se ha enviado de forma correcta...';
                res.json({ respuesta });
            }
        })
    }
}