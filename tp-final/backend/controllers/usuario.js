const usuarioBD = require('../dataBase/usuarioBD');

buscarUsuario = async(req, res) => {
    try{
        if(req.body.username && req.body.password){
            const response = await usuarioBD.buscarUsuario(req.body.username, req.body.password);
            if(response.length){
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }
                res.status(200).json({status:'OK',data:response});
            }else{
                res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
            }
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: Faltan datos REQUERIDOS o NO son correctos!'});
        }
    }catch (e){
        res.status(401).json({status:'ERROR',message:e.message});
        // throw (excep);
    }
}

buscarUsuarioPorID = async(req, res) => {
    try{
        if(!isNaN(req.body.id)){
            const response = await usuarioBD.buscarUsuario(req.body.id);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            if(response.length){
                res.status(200).json({status:'OK',data:response});
            }else{
                res.status(401).json({status:'ERROR', message:'ERROR: credenciales Incorrectas'});
            }
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR: Faltan datos REQUERIDOS o NO son correctos!'});
        }
    }catch (e){
        res.status(401).json({status:'ERROR',message:e.message});
        // throw (e);
    }
}