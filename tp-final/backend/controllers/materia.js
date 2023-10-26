const materiaBD = require('../dataBase/materiaBD');

agregar = async(req, res) => {
    try{
        if(req.body.nombre && req.body.horasSemanales && (req.body.tipoMateria==0 || req.body.tipoMateria==1) && req.body.idCarrera){
            response = await materiaBD.buscarMateriaPorCarreraNombreExacto(req.body.idCarrera, req.body.nombre);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }else{
                if(!response[0].length){
                    response = await materiaBD.agregarMateria(req.body);
                    if(response.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                    }else{
                        res.status(200).json({status:'OK',message:'La materia se añadio correctamente', data:materiaBD.buscarMateriaPorId(response[0]['insertId'])});
                    }    
                }else{
                    res.status(400).json({status:'ERROR',message:'ERROR: La materia ya EXISTE para esa Carrera!'});
                }
            }     
        }else{
            res.status(400).json({status:'ERROR',message:'ERROR: Faltan datos REQUERIDOS!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw(excep);
    }
}

buscar = async(req, res) => {
    try{
        if(req.query['idCarrera']){
            if(req.query['nombreMateria']){
                response = await materiaBD.buscarMateriasPorCarreraNombre(req.query['idCarrera'],req.query['nombreMateria']);
            }else{
                response = await materiaBD.buscarMateriasPorCarrera(req.query['idCarrera']);
            }   
        }else{
            response = await materiaBD.buscarMateria(req.query['nombreMateria']); 
        }
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR', message:excep});
        throw excep;
    }
}

editar = async(req, res) => {
    try{
        if(req.body.idMateria && req.body.nombre && req.body.horasSemanales && (req.body.tipoMateria==0 || req.body.tipoMateria==1) && req.body.idCarrera){
            resp = await materiaBD.buscarMateriaPorId(req.body.idMateria);
            if(resp[0].length && resp[0][0].Nombre == req.body.nombre && resp[0][0].idCarrera == req.body.idCarrera ){
                // la matera esiste y no modifico el nombre, ni la carrera, entonces
                resp = await materiaBD.editarMateria(req.body.idMateria, req.body.nombre, req.body.horasSemanales, req.body.tipoMateria, req.body.idCarrera);
                if(resp.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                }else{
                    resp = await materiaBD.editarMateria(req.body.idMateria, req.body.nombre, req.body.horasSemanales, req.body.tipoMateria, req.body.idCarrera);
                    if(resp.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                    }else{
                        //ACA
                        res.status(200).json({status:'OK',message:'Los cambios furon guardados.'});
                    }
                }
            }else if(resp[0].length && (resp[0][0].Nombre != req.body.nombre || resp[0][0].idCarrera != req.body.idCarrera) ){
                // la materia existe y modifico el nombre o la carrera
                resp = await materiaBD.buscarMateriaPorCarreraNombreExacto(req.body.idCarrera, req.body.nombre);
                if(resp[0].length){
                    // Si la cambio de carrera o le cambio el nombre o ambos, ver que no haya otra materia que se llame igual
                    res.status(400).json({status:'ERROR',message:'ERROR: Ya existe otra materia IGUAL, en la MISMA carrera!'});
                }else{
                    resp = await materiaBD.editarMateria(req.body.idMateria, req.body.nombre, req.body.horasSemanales, req.body.tipoMateria, req.body.idCarrera);
                    if(resp.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+resp.sqlMessage});
                    }else{
                        //ACA
                        res.status(200).json({status:'OK',message:'Los cambios furon guardados.'});
                    }
                }
            }else{
                res.status(400).json({status:'ERROR',message:'ERROR: NO existe una materia con ese Id!'});
            }
        }else{
            res.status(400).json({status:'ERROR',message:'ERROR: Faltan datos REQUERIDOS!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep.message});
        throw excep;
    }
}

eliminar = async(req, res) => {
    try{
        if(req.body.idMateria){
            response = await materiaBD.eliminarMateria(req.body.idMateria);
            if(response.affectedRows >= 1){
                res.status(200).json({status:'OK',message:'La materia fue dada de baja'});
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR: La materia con ese Id NO EXISTE!'});
            }
        }else{
            res.status(400).json({status:'ERROR',message:'ERROR: Faltan datos REQUERIDOS!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw excep;
    }
}

buscarPorCarrera = async(req, res) => {
    try{
        const response = await materiaBD.buscarMateriaPorCarrera(req.body.idCarrera);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw excep;
    }
}

module.exports = {
    agregar,
    editar,
    buscar,
    eliminar
}