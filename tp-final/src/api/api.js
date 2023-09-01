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
appi.use(express.urlencoded({extended:true}))

// console.log(process.env);


// endpoint de testeo del API
appi.get('/', (req, res)=>{
    // console.log('hubo get');
    
    const saludo = 'bienvenido a prog3 - 2023!';
	    res.status(200).json({saludo});
});

appi.options('*', cors()) 
appi.post('/contacto', cors(), (req, res) => {
    const data = req.body;
    console.log(data);
    res.send(data);
  })


appi.listen(process.env.PUERTO, ()=>{
    console.log('API prog3 iniciada ' + process.env.PUERTO);
})