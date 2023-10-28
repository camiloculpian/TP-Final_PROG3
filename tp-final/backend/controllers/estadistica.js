const estadisticaBD = require('../dataBase/estadisticaBD');

obtenerEstadisticaMaterias = async(req, res) => {
    try{
        response = await estadisticaBD.getCourseStatistic(req.query['idMateria']);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (e){
        return e;
    }
}

obtenerEstadisticaCarreras = async(req, res) => {
    try{
        response = await estadisticaBD.getCareerStatistic(req.query['idCarrera']);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (e){
        return e;
    }
}

obtenerEstadisticaEstudiantes = async(req, res) => {
    try{
        response = await estadisticaBD.getStudentStatistic(req.query['idEstudiante']);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (e){
        return e;
    }
}

module.exports = {
    obtenerEstadisticaCarreras,
    obtenerEstadisticaEstudiantes,
    obtenerEstadisticaMaterias
}