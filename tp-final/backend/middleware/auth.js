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
        req.user.length > 0 ? next() : Error.throw('user NOT esist, AUTHORIZATION ERROR');
    } catch (error) {
       return next(error); 
    }
}

const isAuthenticatedAndBedel = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            res.status(401).json({status:'ERROR', message: '401: UNAUTORIZED'});
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await usuarioBD.buscarUsuarioPorID(verify.idUsuario);
        req.user.length > 0 && req.user[0].tipoUsuario == 1? next() : res.status(401).json({status:'ERROR', message: 'AUTHORIZATION ERROR, check user and permissions'});
    } catch (error) {
       res.status(401).json({status:'ERROR', message: '401: UNAUTORIZED'});
       return next({status:'ERROR', message: '401: UNAUTORIZED'}); 
    }
}

const isAuthenticatedAndDecano = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            res.status(401).json({status:'ERROR', message: '401: UNAUTORIZED'});
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await usuarioBD.buscarUsuarioPorID(verify.idUsuario);
        req.user.length > 0 && req.user[0].tipoUsuario == 0? next() : res.status(401).json({status:'ERROR', message: 'AUTHORIZATION ERROR, check user and permissions'});
    } catch (error) {
        console.log(error);
       return next(error); 
    }
}

module.exports = {
    isAuthenticated,
    isAuthenticatedAndBedel,
    isAuthenticatedAndDecano
}