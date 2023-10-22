const { query } = require('../dataBase/conexionBD');
const inscripcionesBD = require('../dataBase/inscripcionesBD')

const inscribirMateria = async(req, res) => {
    return [];
}

const buscarMaterias = async(req, res) => {
    return [];
}

const borrarInscripcionMateria = (req, res) => {
    return [];
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
    buscarCarreras
}