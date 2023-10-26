const { response } = require('express');
const carreraBD = require('../dataBase/carreraBD');

agregar = async(req, res) => {
    try{
        if(req.body.nombre && (req.body.modalidad===0 || req.body.modalidad===1)){
            carrera = await carreraBD.buscarCarreraPorNombreExacto(req.body.nombre);
            if(!carrera[0].length){
                response = await carreraBD.agregarCarrera(req.body);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }else{
                    carrera = await carreraBD.buscarCarreraPorId(response[0]['insertId']);
                    res.status(200).json({status:'OK',message:'La carrera se añadio correctamente', data:carrera});
                }
                
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
                }else{
                    // if(response.affectedRows == 1) ?
                    res.status(200).json({status:'OK',message:'La carrera fue dada de baja.' , data:response});
                } 
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

editar = async(req, res) => {
    try{
        if(req.body.idCarrera && req.body.nombre && (req.body.modalidad == 0 ||  req.body.modalidad == 1)){
            resp = await carreraBD.buscarCarreraPorId(req.body.idCarrera)
            if(resp[0].length >= 1 && resp[0][0].Nombre === req.body.nombre){
                // Si existe y NO modificó el nombre que deje modificar el tipo de carrera
                resp = await carreraBD.editarCarrera(req.body.idCarrera, req.body.nombre, req.body.modalidad);
                if(resp.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                }else{
                    resp = await carreraBD.buscarCarreraPorId(req.body.idCarrera);
                    if(resp.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                    }else{
                        res.status(200).json({status:'OK',message:'Los cambios fueron guardados.' , data:resp[0]});
                    }
                }
            }else if(resp[0].length >= 1){
                // Si existe y modificó el nombre que deje modificar el tipo de carrera y el nombre siempre y cuando el nombre no sea igual a otra carrera
                resp = await carreraBD.buscarCarreraPorNombreExacto(req.body.nombre)
                if(resp[0].length >= 1){
                    res.status(400).json({status:'ERROR', message:'ERROR: Ya existe una carrera con ese NOMBRE'});
                }else{
                    resp = await carreraBD.editarCarrera(req.body.idCarrera, req.body.nombre, req.body.modalidad);
                    if(resp.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                    }else{
                        resp = await carreraBD.buscarCarreraPorId(req.body.idCarrera);
                        if(resp.errno){
                            res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                        }else{
                            res.status(200).json({status:'OK',message:'Los cambios fueron guardados.' , data:resp[0]});
                        }
                    }
                }
            }else{
                    res.status(400).json({status:'ERROR',message:'NO existe una carrera con ese Id!'});
            }
        }
    }catch(e){
        res.status(400).json({status:'ERROR',message:e});
        throw e;
    }
}

module.exports = {
                  agregar,
                  buscar,
                  borrar,
                  editar
}