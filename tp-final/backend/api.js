// framework express
const express = require('express');
// envio de correo electrónicos
const nodemailer = require('nodemailer');
// manejo de variables de entorno
require('dotenv').config();

const cors = require('cors')

// mi app servidor 
const appi = express();

// para recibir las peticiones del req en formato json
appi.use(express.json());
appi.use(express.urlencoded({ extended: true }))
appi.use(cors());
// console.log(process.env);


// endpoint de testeo del API
appi.get('/', (req, res) => {
    // console.log('hubo get');

    const saludo = 'bienvenido a prog3 - 2023!';
    res.status(200).json({ saludo });
});

// appi.options('*', cors()) 
appi.post('/contacto', cors(), (req, res) => {
    const { nombre, email, mensaje } = req.body['formData'];
    // console.log(data);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.CLAVE
        }
    })

    //TAREA: mejorar el cuerpo del correo
    //agregar el mensaje que recibmos en el body 
    //Les dejo la siguiente forma de colocar las variables si estan familiarizados, es un poco más cómodo y legible (la pueden descartar si no les gusta)
    const cuerpo1 = `<h1>Hola llegó un mail de ${nombre}</h1> \n ${mensaje}`
    const cuerpo = '<h1>Hola llego un correo de ' + nombre + ' </h1>' + '\n' + mensaje;

    const opciones = {
        from: email,
        to: 'ingo.prog3@gmail.com',
        subject: '___CONTACTO___' + email,
        html: cuerpo
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
})


appi.listen(process.env.PUERTO, () => {
    console.log('API prog3 iniciada ' + process.env.PUERTO);
})