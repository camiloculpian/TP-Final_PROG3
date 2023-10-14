// const conexion = require('../dataBase/conexionBD');
const usuarioBD = require('../dataBase/usuarioBD');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            res.status(401).json({status:'ERROR', message: '401: UNAUTORIZED'});
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await usuarioBD.buscarUsuarioPorID(verify.idUsuario);
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = {
    isAuthenticated
}