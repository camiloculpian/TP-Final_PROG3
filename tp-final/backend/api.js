// framework express
const express = require('express');
// envio de correo electrónicos
const nodemailer = require('nodemailer');
// para loguear las peticiones que recibe el servidor
var morgan = require('morgan');
//para trabajar con el sistema de archivos: crear leer etc archivos
var fs = require('fs');
// trabajar con las rutas de archivos y directorios del sistema de archivos
var path = require('path');

// handlerbar (estilo al mail de contacto)
const handlebars = require('handlebars');

// mysql (CONECTAR A LA BASE DE DATOS)
const mysql = require('mysql2');

// manejo de variables de entorno
require('dotenv').config();

// ALLOW CROSS ORIGIN REQUESTS
const cors = require('cors')

// mi app servidor 
const appi = express();

// para recibir las peticiones del req en formato json
appi.use(express.json());
appi.use(express.urlencoded({extended:true}))

// CREA UN ARCHIVO DE ACCESO
// create a write stream (in append mode)
// console.log(__dirname);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
appi.use(morgan('combined', { stream: accessLogStream }))

appi.use(cors());


// endpoint de testeo del API
appi.get('/', (req, res) => {
    // console.log('hubo get');
    const saludo = 'Bienvenido a la API de Bedelia - V1';
    res.status(200).json({ saludo });
});

// las rutas del api
const v1Publico = require('./v1/routes/publico');
const v1Estudiante = require('./v1/routes/estudiante');
const v1Usuario = require('./v1/routes/usuario');


// middlEWare
appi.use('/api/v1/publico', v1Publico);
appi.use('/api/v1/estudiante', v1Estudiante);
appi.use('/api/v1/usuario', v1Usuario);



// appi.post('/contacto', cors(), (req, res) => {
//     const { nombre, email, mensaje } = req.body['formData'];
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.CORREO,
//             pass: process.env.CLAVE
//         }
//     })

//     //TAREA: mejorar el cuerpo del correo
//     //agregar el mensaje que recibmos en el body 
//     //Les dejo la siguiente forma de colocar las variables si estan familiarizados, es un poco más cómodo y legible (la pueden descartar si no les gusta)
//     const cuerpo1 = `<h1>Hola llegó un mail de ${nombre}</h1> \n ${mensaje}`
//     const cuerpo = '<h1>Hola llego un correo de ' + nombre + ' </h1>' + '\n' + mensaje;

//     const opciones = {
//         from: email,
//         to: 'ingo.prog3@gmail.com',
//         subject: '___CONTACTO___' + email,
//         html: cuerpo
//     }

//     transporter.sendMail(opciones, (error, info) => {
//         if (error) {
//             console.log('error -> ', error);
//             const respuesta = 'El mensaje no ha sido enviado...';
//             res.json({ respuesta });
//         } else {
//             console.log(info);
//             const respuesta = 'El mensaje se ha enviado de forma correcta...';
//             res.json({ respuesta });
//         }
//     })
// })


appi.listen(process.env.PUERTO, () => {
    console.log('🚀 API prog3 iniciada ' + process.env.PUERTO);
})