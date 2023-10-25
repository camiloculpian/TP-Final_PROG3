const carreraBD = require('../dataBase/carreraBD');

agregar = async(req, res) => {
    try{
        if(req.body.nombre && (req.body.modalidad===0 || req.body.modalidad===1)){
            carrera = await carreraBD.buscarCarreraPorNombreExacto(req.body.nombre);
            if(!carrera[0].length){
                response = await carreraBD.agregarCarrera(req.body);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }
                [carrera] = await carreraBD.buscarCarreraPorId(response[0]['insertId']);
                res.status(200).json({status:'OK',message:'La carrera se añadio correctamente', data:carrera});
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR: Ya existe una carrera con ese nombre!'});
            } 
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR: faltan datos!!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw(excep);
    }
}

buscar = async(req, res) => {
    //BUSCA POR NOMBRE APROXIMADO O DEVUELVE UNA LISTA CON TODAS LAS CARRERAS (NO ES NECESARIO PASAR EL NOMBRE)
    try{
        const response = await carreraBD.buscarCarrera(req.body.nombre);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data: response[0]});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw excep;
    }
}

borrar = async(req, res) => {
    try{
        if(req.body.idCarrera){
            carrera = await carreraBD.buscarCarreraPorId(req.body.idCarrera);
            if(carrera[0].length){
                const response = await carreraBD.borrarCarrera(req.body.idCarrera);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }
                // if(response.affectedRows == 1) ?
                res.status(200).json({status:'OK',message:'La carrera fue dada de baja.' , data:response});
            }else{
                res.status(400).json({status:'ERROR',message:'ERROR: no existe una carrera con ese Id!'});
            }
        }else{
            res.status(400).json({status:'ERROR',message:'ERROR idCarrera MUST be provided!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw excep;
    }
}

module.exports = {
                  agregar,
                  buscar,
                  borrar
}