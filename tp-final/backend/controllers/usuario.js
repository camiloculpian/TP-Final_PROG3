const usuarioBD = require('../dataBase/usuarioBD');
const md5 = require('md5')

buscarUsuario = async(req, res) => {
    try{
        const response = await usuarioBD.buscarUsuario(req.body.username, req.body.password);
        if(response.length){
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            res.status(200).json({status:'OK',data:response});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
        }
    }catch (excep){
        throw (excep);
    }
}

buscarUsuarioPorID = async(req, res) => {
    try{
        const response = await usuarioBD.buscarUsuario(req.body.id);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }
        if(response.length){
            res.status(200).json({status:'OK',data:response});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
        }
    }catch (excep){
        throw (excep);
    }
}