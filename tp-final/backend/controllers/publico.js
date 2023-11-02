const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const publicoBD = require('../dataBase/publicoBD');

const enviarCorreo = async (req, res) =>{
    try{
        if(!req.body['nombre']&!req.body['correo']&!req.body['mensaje']){
            const respuesta = 'El mensaje NO ha sido enviado, faltan datos...';
            res.json({ respuesta });
        }else{
            const {nombre, correo, mensaje} = req.body;
            
            const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utils/handlebars/plantilla.hbs'), 'utf8');
            
            const correoTemplate = handlebars.compile(plantillaHds2);
        
            // Datos de la plantilla
            const datos = {
            nombre: nombre,
            correo: correo,
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
                from: correo,
                to: 'ingo.prog3@gmail.com',
                subject: '___CONTACTO___' + correo,
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
    }catch(e){
        res.status(400).json({status:'ERROR',message:e.message});
        // return(e);
    }
}

const getCarreras = async (req, res) => {
    try{
        const response = await publicoBD.getCarreras();
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }
        res.status(200).json({status:'OK', data:response});
    }catch (excep){
        res.status(400).json({status:'ERROR',message:e.message});
        // throw(e);
    }
}

const getMaterias = async (req, res) => {
    try{
        if(!isNaN(req.query['codigoCarrera'])){
            const response = await publicoBD.getMaterias(req.query['codigoCarrera']);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            res.status(200).json({status:'OK', headers: response[1], data:response[0]});
        }else{
            res.status(400).json({status:'ERROR',message:'ERROR: codigoCarrera MUST be provided and MUST be valid'});
        }
    }catch (e){
        res.status(400).json({status:'ERROR',message:e.message});
        // throw(e);
    }
}

module.exports = {
    enviarCorreo,
    getCarreras,
    getMaterias
}