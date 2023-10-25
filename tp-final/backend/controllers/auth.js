const usuarioBD = require('../dataBase/usuarioBD');
const jwt = require('jsonwebtoken');
//const md5 = require('md5')

login = async(req, res) => {
    try{
        if(req.body.username && req.body.password){
            const response = await usuarioBD.buscarUsuario(req.body.username, req.body.password);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            if(response.length){
                const token = await jwt.sign({ idUsuario: response[0].idUsuario }, process.env.SECRET_KEY, {
                    expiresIn: process.env.JWT_EXPIRE,
                });
                res.status(200).cookie('token' , token, {expire : new Date() + 9999, sameSite: 'strict', secure: true}).json({status:'OK',usuario: response[0], token: token});
            }else{
                res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
            }
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: username and password MUST be provided!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw (excep);
    }
}

module.exports = {
    login
}