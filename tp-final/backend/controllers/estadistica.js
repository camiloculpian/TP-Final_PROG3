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
        response = await estadisticaBD.getCareers();
        for(var i = 0; i < response[0].length; i++){
            inscriptos = await estadisticaBD.getCareerCantInscript(response[0][i].idCarrera);
            response[0][i].inscriptos = inscriptos[0][0]['inscriptos'];
            materias = await estadisticaBD.getCareerCantCourses(response[0][i].idCarrera);
            response[0][i].materias = materias[0][0]['materias'];
        }
        console.log(response[0]);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (e){
        console.log(e);
        return e;
    }
}

obtenerEstadisticaEstudiantes = async(req, res) => {
    try{
        response = await estadisticaBD.getStudentsStatistic();
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