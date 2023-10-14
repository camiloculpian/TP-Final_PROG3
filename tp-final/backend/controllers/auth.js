const usuarioBD = require('../dataBase/usuarioBD');
const jwt = require('jsonwebtoken');
const md5 = require('md5')

login = async(req, res) => {
    try{
        const usuario = await usuarioBD.buscarUsuario(req.body.username, md5(req.body.password));
        if(usuario.length){
            const token = await jwt.sign({ idUsuario: usuario.idUsuario }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            res.status(200).cookie('token' , token, {expire : new Date() + 9999, sameSite: 'strict', secure: true}).json({status:'OK',data:usuario, token: token});
        }else{
            res.status(200).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
        }
    }catch (excep){
        throw (excep);
    }
}

module.exports = {
    login
}