const { buscarCarrera } = require('./carreraBD');
const conexion = require('./conexionBD');

const inscribirMateria = async (idMateria, idEstudiante) =>{

}

const buscarMaterias = async (idEstudiante, idCarrera) => {
    //toma el idUsuario i el idCarrera y devuelve lista de materias con un campo extra que dice si esta inscripto o no
}

const buscarCarreras = async (idEstudiante) => {
    //toma el idUsuario y devuelve lista de carreras con un campo extra que dice si esta inscripto o no
    const consulta = `SELECT carrera.idCarrera, 
                             carrera.nombre as Carrera, 
                             IF((carrera.modalidad = 1), 'Virtual' , 'Presencial') AS Modalidad,
                             IF((carrera.idCarrera = estudiantecarrera.carrera), 'SI' , 'NO') AS Inscripto
                      FROM carrera
                      LEFT JOIN estudiantecarrera ON estudiantecarrera.estudiante = ?`;
    
    const carreras = await conexion.query(consulta,idEstudiante);  

    return carreras;
}

module.exports = {
    inscribirMateria,
    buscarMaterias,
    buscarCarreras
}