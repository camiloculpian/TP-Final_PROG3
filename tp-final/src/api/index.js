// framework express
const express = require('express');
// envio de correo electrónicos
const nodemailer = require('nodemailer');
// manejo de variables de entorno
require('dotenv').config();

// mi app servidor 
const app = express();

// para recibir las peticiones del req en formato json
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// console.log(process.env);


// endpoint de testeo del API
app.get('/', (req, res)=>{
    // console.log('hubo get');
    
    const saludo = 'bienvenido a prog3 - 2023!';

	    res.status(200).json({saludo});
});


app.post('/contacto', (req, res)=>{
    const {nombre, correo, mensaje} = req.body;
    // const nombre = req.body.nombre
    // console.log(nombre1);
    // console.log(correo);
    // console.log(mensaje);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

	//TAREA: mejorar el cuerpo del correo
	//agregar el mensaje que recibmos en el body 
    const cuerpo = '<h1>Hola llego un correo de ' + nombre + ' </h1>';

    const opciones = {
        from : 'api prog3',
        to:'cristian.faure@uner.edu.ar',
        subject:'titulo',
        html:cuerpo
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            console.log('error -> ', error);
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            console.log(info);
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    })

    
})


app.listen(process.env.PUERTO, ()=>{
    console.log('API prog3 iniciada ' + process.env.PUERTO);
})