const usuarioBD = require('../dataBase/usuarioBD');
const jwt = require('jsonwebtoken');
//const md5 = require('md5')

login = async(req, res) => {
    try{
        const usuario = await usuarioBD.buscarUsuario(req.body.username, req.body.password);
        
        if(usuario.length){
            const token = await jwt.sign({ idUsuario: usuario[0].idUsuario }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            res.status(200).cookie('token' , token, {expire : new Date() + 9999, sameSite: 'strict', secure: true}).json({status:'OK',usuario: usuario[0], token: token});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
        }
    }catch (excep){
        throw (excep);
    }
}

module.exports = {
    login
}