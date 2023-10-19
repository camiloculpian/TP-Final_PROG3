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

//cookie-parser
const cookieParser = require('cookie-parser');

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
appi.use(express.urlencoded({extended:true}));

appi.use(cookieParser());

// CREA UN ARCHIVO DE ACCESO
// create a write stream (in append mode)
// console.log(__dirname);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// setup the logger
appi.use(morgan('combined', { stream: accessLogStream }));

appi.use(cors({ origin: true, credentials: true  }));


// endpoint de testeo del API
appi.get('/', (req, res) => {
    // console.log('hubo get');
    const saludo = 'Bienvenido a la API de Bedelia - V1';
    res.status(200).json({ saludo });
});

// las rutas del api
const v1Publico = require('./v1/routes/publico');
const v1Estudiante = require('./v1/routes/estudiante');
const V1Carrera = require('./v1/routes/carrera');
const V1Materia = require('./v1/routes/materia');
const v1Usuario = require('./v1/routes/usuario');
const v1Inscripciones = require('./v1/routes/inscripciones');
const v1Auth = require('./v1/routes/auth');
const V1Resources = require('./v1/routes/resources');



// middlEWare
appi.use('/api/v1/publico', v1Publico);
appi.use('/api/v1/estudiante', v1Estudiante);
appi.use('/api/v1/carrera', V1Carrera);
appi.use('/api/v1/materia', V1Materia);
appi.use('/api/v1/usuario', v1Usuario);
appi.use('/api/v1/auth', v1Auth);
appi.use('/api/v1/resources', V1Resources);


appi.listen(process.env.PUERTO, () => {
    console.log('🚀 API prog3 iniciada ' + process.env.PUERTO);
})