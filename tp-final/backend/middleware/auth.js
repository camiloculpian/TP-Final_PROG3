const conexion = require('./conexionBD');
const usuarioBD = require('../dataBase/usuarioBD');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await usuarioBD.buscarUsuarioPorID(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}