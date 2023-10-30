const conexion = require('./conexionBD');

const getCareers = async () =>{
    try{
        const consulta = `SELECT carrera.idCarrera AS 'idCarrera',
                            carrera.nombre AS nombre,
                            IF((modalidad=0),'Presencial','Virtual') AS modalidad
                        FROM carrera 
                        WHERE carrera.activo=1;`;
        const response = await conexion.query(consulta);
        return response;
    }catch(e){
        return(e);
    }
}

const getCareerCantTotal = async () =>{
    try{
        const consulta = `SELECT COUNT(carrera.idCarrera) AS 'Cantidad de Carreras' FROM carrera WHERE carrera.activo=1;`;
        const response = await conexion.query(consulta);
        return response;
    }catch(e){
        return(e);
    }
}

const getCareerCantVirtual = async () =>{
    try{
        const consulta = `SELECT COUNT(carrera.idCarrera) AS 'Cantidad de Carreras Virtuales' FROM carrera WHERE carrera.modalidad = 1 AND carrera.activo=1;`;
        const response = await conexion.query(consulta);
        return response;
    }catch(e){
        return(e);
    }
}

const getCareerCantpresential = async () =>{
    try{
        const consulta = `SELECT COUNT(carrera.idCarrera) AS 'Cantidad de Carreras Presenciales' FROM carrera WHERE carrera.modalidad = 0 AND carrera.activo=1;`;
        const response = await conexion.query(consulta);
        return response;
    }catch(e){
        return(e);
    }
}

const getCareerCantDeleted = async () =>{
    try{
        const consulta = `SELECT COUNT(carrera.idCarrera) AS 'Cantidad de Carreras dadas de Baja' FROM carrera WHERE carrera.activo = 0;`;
        const response = await conexion.query(consulta);
        return response;
    }catch(e){
        return(e);
    }
}

const getCareerCantInscript = async (idCarrera) =>{
    try{
        const consulta = `SELECT COUNT(estudiantecarrera.idEstudianteCarrera) AS 'inscriptos'
                            FROM estudiantecarrera
                            LEFT JOIN carrera ON estudiantecarrera.carrera = carrera.idCarrera
                            WHERE estudiantecarrera.fechaBaja IS NULL AND estudiantecarrera.carrera = ?;`;
        const response = await conexion.query(consulta,[idCarrera]);
        return response;
    }catch(e){
        return(e);
    }
}

const getCareerCantCourses = async (idCarrera) =>{
    try{
        const consulta = `SELECT COUNT(carreramateria.idCarreraMateria) AS 'materias'
                            FROM carreramateria
                            LEFT JOIN carrera ON carreramateria.idCarrera = carrera.idCarrera
                            WHERE carreramateria.idCarrera = ?;`;
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
    getCareers,
    getCareerCantTotal,
    getCareerCantCourses,
    getCareerCantDeleted,
    getCareerCantInscript,
    getCareerCantVirtual,
    getCareerCantpresential,

    getCourseStatistic,
    getStudentStatistic
}