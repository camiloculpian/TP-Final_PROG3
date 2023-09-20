// framework express
const express = require('express');
// envio de correo electrónicos
const nodemailer = require('nodemailer');

// para gestionar cors
const cors = require('cors');

// ESTO NO SE VIO EN CLASES
// para loguear las peticiones que recibe el servidor
var morgan = require('morgan');
//para trabajar con el sistema de archivos: crear leer etc archivos
var fs = require('fs');
// trabajar con las rutas de archivos y directorios del sistema de archivos
var path = require('path');

// handlerbar 
const handlebars = require('handlebars');

// mysql
const mysql = require('mysql2');

// manejo de variables de entorno
require('dotenv').config();


// mi app servidor 
const app = express();

// recibimos datos en formato json
app.use(express.json());
// urlconded se encarga de analizar los datos codificados en la url y los coloca en el req.body 
// para poder trabajar con ellos en el manejdaor de la ruta.
app.use(express.urlencoded({extended:true}))


// ESTO NO SE VIO EN CLASES
// descomentar y mirar lo que muestra la consola en cada solicitud (get o post) que recibe el servidor
// app.use(morgan('short')); 

// CREA UN ARCHIVO DE ACCESO
// create a write stream (in append mode)
// console.log(__dirname);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.use(cors());

// endpoint de testeo del API
app.get('/', (req, res)=>{
    // const saludo = 'bienvenido a prog3 - 2023!';
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});


// las rutas del api
const v1Publico = require('./v1/rutas/publico');
const v1Estudiante = require('./v1/rutas/estudiante');


// middlEWare
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/estudiante', v1Estudiante);




// // conexión a la base de datos
// const conexion = mysql.createConnection({
//     host: 'localhost',
//     user: 'bedelia12',
//     database: 'bedelia12',
//     password: '2023$prog3'
// });

// app.get('/estudiantes', (req, res)=>{
//     const consulta = 'SELECT * FROM estudiante where activo = 1';
//     conexion.execute(consulta, (error, resultado, campos) =>{
//         if(error){
//             console.log(error);
//         }else{
//             console.log(campos);
//             res.status(200).json(resultado);
//         }
//     })
// });

app.listen(process.env.PUERTO, ()=>{
    console.log('🚀 API prog3 iniciada ' + process.env.PUERTO);
})