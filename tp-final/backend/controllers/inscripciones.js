const { query } = require('../dataBase/conexionBD');
const inscripcionesBD = require('../dataBase/inscripcionesBD')

const inscribirMateria = async(req, res) => {
    try{
        if(req.body['idEstudiante'] && req.body['idMateria']){
            //TO-DO: Buscar estudiante y materia por id y ver si existen...
            const response = await inscripcionesBD.inscribirMateria(req.body['idEstudiante'],req.body['idMateria']);
            //TO-DO: si afected rows > 0 tuvo exito
            res.status(200).json({status:'OK', message:'La inscripcion se ha registrado con exito'});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
        }   
    }catch (e){
        //TO-DO: lanzar errores
        throw e;
    }
}

const inscribirCarrera = async(req, res) => {
    try{
        if(req.body['idEstudiante'] && req.body['idCarrera']){
            //TO-DO: Buscar estudiante y carrera por id y ver si existen...
            const response = await inscripcionesBD.inscribirCarrera(req.body['idEstudiante'],req.body['idCarrera']);
            //TO-DO: si afected rows > 0 tuvo exito
            res.status(200).json({status:'OK', message:'La inscripcion se ha registrado con exito'});
        }else{
            res.status(401).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
        }   
    }catch (e){
        //TO-DO: lanzar errores
        throw e;
    }
}

const buscarMaterias = async(req, res) => {
    try{
        const response = await inscripcionesBD.buscarMaterias(req.query['idEstudiante'],req.query['idCarrera']);
        res.status(200).json({status:'OK', headers: response[1],data:response[0]});
    }catch (e){
        //TO-DO: lanzar errores
        throw e;
    }
}

const buscarCarreras = async(req, res) => {
    try{
        if(req.query['showOnlyInscripted']){
            const response = await inscripcionesBD.buscarCarrerasInscriptas(req.query['idEstudiante']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }else{
            const response = await inscripcionesBD.buscarCarreras(req.query['idEstudiante']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (excep){
        //TO-DO: lanzar errores
        throw excep;
    }
}

const borrarInscripcionMateria = async (req, res) => {
    try{
        if(req.body['idEstudiante'] && req.body['idMateria']){
            //TO-DO: Buscar estudiante y materia por id y ver si existen...
            const response = await inscripcionesBD.borrarInscripcionMateria(req.body['idEstudiante'],req.body['idMateria']);
            if(response.errno){
                res.status(401).json({status:'ERROR', message:'ERROR eliminando inscripcion a materia '+response.sqlMessage});
            }
            //TO-DO: si afected rows > 0 tuvo exito
            res.status(200).json({status:'OK', message:'La inscripcion se ha eliminado con exito'});
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
        }   
    }catch (e){
        //TO-DO: lanzar errores
        throw e;
    }
}

const borrarInscripcionCarrera = async (req, res) => {
    try{
        if(req.body['idEstudiante'] && req.body['idCarrera']){
            //TO-DO: Buscar estudiante y carrera por id y ver si existen...
            const response = await inscripcionesBD.borrarInscripcionCarrera(req.body['idEstudiante'],req.body['idCarrera']);
            if(response.errno){
                res.status(401).json({status:'ERROR', message:'ERROR eliminando inscripcion a carrera '+response.sqlMessage});
            }
            //TO-DO: si afected rows > 0 tuvo exito
            res.status(200).json({status:'OK', message:'La inscripcion se ha eliminado con exito'});
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
        }   
    }catch (e){
        //TO-DO: lanzar errores
        throw e;
    }
}

module.exports = {
    inscribirMateria,
    buscarMaterias,
    borrarInscripcionMateria,
    borrarInscripcionCarrera,
    inscribirCarrera,
    buscarCarreras
}