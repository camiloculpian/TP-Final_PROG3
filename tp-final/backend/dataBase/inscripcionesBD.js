const { buscarCarrera } = require('./carreraBD');
const conexion = require('./conexionBD');

const inscribirMateria = async (idEstudiante, idMateria) =>{
    try{
        const consulta = `INSERT INTO estudiantemateria (estudiante, materia, fecha) VALUES (?,?,CURDATE())`
        const respuesta = await conexion.query(consulta,[idEstudiante,idMateria]);  
        return respuesta;
    }catch(e){
        return(e);
    }
}

const inscribirCarrera = async (idEstudiante, idCarrera) =>{
    try{
        const consulta = `INSERT INTO estudiantecarrera (estudiante, carrera, fechaAlta) VALUES (?,?,CURDATE())`
        const respuesta = await conexion.query(consulta,[idEstudiante,idCarrera]);  
        return respuesta;
    }catch(e){
        return(e);
    }
}

const buscarMaterias = async (idEstudiante, idCarrera) => {
    //toma el idUsuario i el idCarrera y devuelve lista de materias con un campo extra que dice si esta inscripto o no
    try{
        const consulta = `SELECT 
                                materia.idMateria AS idMateria,
                                materia.nombre AS Nombre,
                                materia.tipoMateria as Tipo,
                                materia.horasSemanales as 'Horas Semanales',
                                IF((estudiantemateria.estudiante = ?), 'SI', 'NO') AS Inscripto
                            FROM materia
                            LEFT JOIN carreramateria ON materia.idMateria = carreramateria.idMateria
                            LEFT JOIN estudiantemateria ON materia.idMateria = estudiantemateria.materia AND estudiantemateria.estudiante = ?
                            WHERE materia.activo = 1 AND idCarrera=?`;
        const materias = await conexion.query(consulta,[idEstudiante,idEstudiante,idCarrera]);  
        return materias;
    }catch(e){
        return(e);
    }
}

const buscarCarreras = async (idEstudiante) => {
    //toma el idUsuario y devuelve lista de carreras con un campo extra que dice si esta inscripto o no
    try{
        const consulta = `SELECT 
                                carrera.idCarrera AS idCarrera,
                                carrera.nombre AS Nombre,
                                IF((carrera.modalidad = 1), 'Virtual' , 'Presencial') AS Modalidad,
                                IF((estudiantecarrera.estudiante = ?), 'SI', 'NO') AS Inscripto
                            FROM carrera
                            LEFT JOIN estudiantecarrera ON carrera.idCarrera = estudiantecarrera.carrera AND estudiantecarrera.estudiante = ? AND estudiantecarrera.fechaBaja IS NULL
                            WHERE carrera.activo = 1 `;
        
        const carreras = await conexion.query(consulta,[idEstudiante,idEstudiante]);  
        return carreras;
    }catch(e){
        return(e);
    }
}

const buscarCarrerasInscriptas = async (idEstudiante) => {
    //toma el idUsuario y devuelve lista de carreras con un campo extra que dice si esta inscripto o no
    try{
        const consulta = `SELECT carrera.idCarrera, 
                                carrera.nombre as Nombre, 
                                IF((carrera.modalidad = 1), 'Virtual' , 'Presencial') AS Modalidad
                        FROM carrera
                        LEFT JOIN estudiantecarrera ON estudiantecarrera.estudiante = ?
                        WHERE carrera.idCarrera = estudiantecarrera.carrera AND estudiantecarrera.fechaBaja IS NULL`;
        
        const carreras = await conexion.query(consulta,idEstudiante);  
        return carreras;
    }catch(e){
        return(e);
    }
}

module.exports = {
    inscribirMateria,
    buscarMaterias,
    buscarCarreras,
    inscribirCarrera,
    buscarCarrerasInscriptas
}