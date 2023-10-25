const materiaBD = require('../dataBase/materiaBD');

agregar = async(req, res) => {
    try{
        if(req.body.nombre && req.body.horasSemanales && (req.body.tipoMateria==0 || req.body.tipoMateria==1) && req.body.idCarrera){
            response = await materiaBD.buscarMateriasPorCarreraNombreExacto(req.body.idCarrera, req.body.nombre);
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
            response = await materiaBD.buscarMateria(req.body.nombre); 
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
        
    }catch (excep){
        res.status(400).json({status:'ERROR',message:excep});
        throw excep;
    }
}

eliminar = async(req, res) => {
    try{
        
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