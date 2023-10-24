const { query } = require('../dataBase/conexionBD');
const inscripcionesBD = require('../dataBase/inscripcionesBD')

const inscribirMateria = async(req, res) => {
    try{
        if(req.body['idEstudiante'] && req.body['idMateria']){
            console.log('const inscribirMateria = async(req, res)');
            //TO-DO: Buscar estudiante y materia por id y ver si existen...
            const response = await inscripcionesBD.inscribirMateria(req.body['idEstudiante'],req.body['idMateria']);
            //TO-DO: si afected rows > 0 tuvo exito
            res.status(200).json({status:'OK', message:'La inscripcion se ha registrado con exito'});
        }else{
            res.status(200).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
        }   
    }catch (e){
        throw e;
    }
}

const inscribirCarrera = async(req, res) => {
    try{
        console.log('const inscribirCarrera = async(req, res)');
        console.log(req.body);
        if(req.body['idEstudiante'] && req.body['idCarrera']){
            //TO-DO: Buscar estudiante y carrera por id y ver si existen...
            const response = await inscripcionesBD.inscribirCarrera(req.body['idEstudiante'],req.body['idCarrera']);
            //TO-DO: si afected rows > 0 tuvo exito
            res.status(200).json({status:'OK', message:'La inscripcion se ha registrado con exito'});
        }else{
            res.status(200).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
        }   
    }catch (e){
        throw e;
    }
}

const buscarMaterias = async(req, res) => {
    try{
        const response = await inscripcionesBD.buscarMaterias(req.query['idEstudiante'],req.query['idCarrera']);
        res.status(200).json({status:'OK', headers: response[1],data:response[0]});
    }catch (e){
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
        throw excep;
    }
}

const borrarInscripcionMateria = (req, res) => {
    try{
        return [];
    }catch (e){
        throw e;
    }
}

const borrarInscripcionCarrera = (req, res) => {
    try{
        return [];
    }catch (e){
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