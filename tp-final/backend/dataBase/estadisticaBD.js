const conexion = require('./conexionBD');

const getCareerStatistic = async (idCarrera) =>{
    try{
        console.log('const getCareerStatistic = async (idCarrera)');
        const consulta = ``;
        const response = await conexion.query(consulta,[idCarrera]);
        return response;
    }catch(e){
        return(e);
    }
}

const getCourseStatistic = async (idMateria) =>{
    try{
        console.log('const getCourseStatistic = async (idMateria)');
        const consulta = ``;
        const response = await conexion.query(consulta,[idMateria]);
        return response;
    }catch(e){
        return(e);
    }
}

const getStudentStatistic = async (idEstudiante) =>{
    try{
        console.log('const getStudentStatistic = async (idEstudiante)');
        const consulta = ``;
        const response = await conexion.query(consulta,[idEstudiante]);
        return response;
    }catch(e){
        return(e);
    }
}

module.exports = {
    getCareerStatistic,
    getCourseStatistic,
    getStudentStatistic
}