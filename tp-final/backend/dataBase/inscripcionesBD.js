const { buscarCarrera } = require('./carreraBD');
const conexion = require('./conexionBD');

const inscribirMateria = async (idMateria, idEstudiante) =>{

}

const buscarMaterias = async (idEstudiante, idCarrera) => {
    //toma el idUsuario i el idCarrera y devuelve lista de materias con un campo extra que dice si esta inscripto o no
    const consulta = `SELECT materia.idMateria, 
                             materia.nombre as Nombre, 
                             IF((materia.modalidad = 1), 'Cuatrimestral' , 'Anual') AS Tipo,
                             IF((materia.idMateria = estudiantemateria.idMateria), 'SI' , 'NO') AS Inscripto
                      FROM materia
                      LEFT JOIN estudiantemateria ON estudiantemateria.idEstudiante = ?
                      WHERE materiacarrera.idMateria = materia.idMateria AND materiacarrera.idCarrera = ?`;
    
    const carreras = await conexion.query(consulta,[idEstudiante,idCarrera]);  

    return carreras;
}

const buscarCarreras = async (idEstudiante) => {
    //toma el idUsuario y devuelve lista de carreras con un campo extra que dice si esta inscripto o no
    const consulta = `SELECT carrera.idCarrera, 
                             carrera.nombre as Nombre, 
                             IF((carrera.modalidad = 1), 'Virtual' , 'Presencial') AS Modalidad,
                             IF((carrera.idCarrera = estudiantecarrera.carrera), 'SI' , 'NO') AS Inscripto
                      FROM carrera
                      LEFT JOIN estudiantecarrera ON estudiantecarrera.estudiante = ?`;
    
    const carreras = await conexion.query(consulta,idEstudiante);  

    return carreras;
}

const buscarCarrerasInscriptas = async (idEstudiante) => {
    //toma el idUsuario y devuelve lista de carreras con un campo extra que dice si esta inscripto o no
    const consulta = `SELECT carrera.idCarrera, 
                             carrera.nombre as Nombre, 
                             IF((carrera.modalidad = 1), 'Virtual' , 'Presencial') AS Modalidad
                      FROM carrera
                      LEFT JOIN estudiantecarrera ON estudiantecarrera.estudiante = ?
                      WHERE carrera.idCarrera = estudiantecarrera.carrera`;
    
    const carreras = await conexion.query(consulta,idEstudiante);  

    return carreras;
}

module.exports = {
    inscribirMateria,
    buscarMaterias,
    buscarCarreras,
    buscarCarrerasInscriptas
}