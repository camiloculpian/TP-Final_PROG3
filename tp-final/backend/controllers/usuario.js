const usuarioBD = require('../dataBase/usuarioBD');
const md5 = require('md5')

buscarUsuario = async(req, res) => {
    try{
        const usuario = await usuarioBD.buscarUsuario(req.body.username, req.body.password);
        if(usuario.length){

            res.status(200).json({status:'OK',data:usuario});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
        }
    }catch (excep){
        throw (excep);
    }
}

buscarUsuarioPorID = async(req, res) => {
    try{
        const usuario = await usuarioBD.buscarUsuario(req.body.id);
        if(usuario.length){
            res.status(200).json({status:'OK',data:usuario});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
        }
    }catch (excep){
        throw (excep);
    }
}