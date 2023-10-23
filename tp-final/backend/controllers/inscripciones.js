const { query } = require('../dataBase/conexionBD');
const inscripcionesBD = require('../dataBase/inscripcionesBD')

const inscribirMateria = async(req, res) => {
    try{
        const response = await inscripcionesBD.inscribirMateria(req.query['idEstudiante'],req.query['idMateria']);
        res.status(200).json({status:'OK', headers: response[1],data:response[0]});
    }catch (e){
        throw e;
    }
}

const inscribirCarrera = async(req, res) => {
    try{
        console.log('const inscribirCarrera = async(req, res)');
        console.log(req.body);
        if(req.body['idEstudiante'] && req.body['idCarrera']){
            const response = await inscripcionesBD.inscribirCarrera(req.body['idEstudiante'],req.body['idCarrera']);
        res.status(200).json({status:'OK', message:'Inscripcion exitosa...'});
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

const borrarInscripcionMateria = (req, res) => {
    try{
        return [];
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

module.exports = {
    inscribirMateria,
    buscarMaterias,
    borrarInscripcionMateria,
    inscribirCarrera,
    buscarCarreras
}