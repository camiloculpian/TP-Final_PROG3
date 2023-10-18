const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {
    const consulta = `SELECT
                            estudiante.idEstudiante AS idEstudiante,
                            estudiante.dni AS DNI,
                            estudiante.apellido AS Apellido,
                            estudiante.nombre AS Nombre,
                            DATE_FORMAT(estudiante.fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            estudiante.nacionalidad AS idNacionalidad,
                            pais.nombre AS Nacionalidad,
                            estudiante.correoElectronico AS 'e-m@il',
                            estudiante.celular as Celular
    FROM estudiante 
    LEFT JOIN pais ON pais.id = estudiante.nacionalidad
    WHERE activo = 1 AND idEstudiante = ?`;

    const estudiante = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}

const isDeleted = async (dni) => {
    const consulta = `SELECT
                            estudiante.idEstudiante AS idEstudiante,
                            estudiante.dni AS DNI,
                            estudiante.apellido AS Apellido,
                            estudiante.nombre AS Nombre,
                            DATE_FORMAT(estudiante.fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            estudiante.nacionalidad AS idNacionalidad,
                            pais.nombre AS Nacionalidad,
                            estudiante.correoElectronico AS 'e-m@il',
                            estudiante.celular as Celular
    FROM estudiante 
    LEFT JOIN pais ON pais.id = estudiante.nacionalidad
    WHERE AND dni = ?`;

    const estudiante = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}

const buscarPorDNI = async (dniEstudiante) => {
    const consulta = `SELECT
                            estudiante.idEstudiante AS idEstudiante,
                            estudiante.dni AS DNI,
                            estudiante.apellido AS Apellido,
                            estudiante.nombre AS Nombre,
                            DATE_FORMAT(estudiante.fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            estudiante.nacionalidad AS idNacionalidad,
                            pais.nombre AS Nacionalidad,
                            estudiante.correoElectronico AS 'e-m@il',
                            estudiante.celular as Celular
    FROM estudiante 
    LEFT JOIN pais ON pais.id = estudiante.nacionalidad
    WHERE activo = 1 AND dni = ?`;

    const estudiante = await conexion.query(consulta,dniEstudiante);    

    return estudiante;
}

const buscarPorApeNomb = async (apeEstudiante,nombEstudiante) => {
    const consulta = `SELECT
                            estudiante.idEstudiante AS idEstudiante,
                            estudiante.dni AS DNI,
                            estudiante.apellido AS Apellido,
                            estudiante.nombre AS Nombre,
                            DATE_FORMAT(estudiante.fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            estudiante.nacionalidad AS idNacionalidad,
                            pais.nombre AS Nacionalidad,
                            estudiante.correoElectronico AS 'e-m@il',
                            estudiante.celular as Celular
    FROM estudiante 
    LEFT JOIN pais ON pais.id = estudiante.nacionalidad
    WHERE estudiante.activo = 1 AND estudiante.apellido LIKE ? AND estudiante.nombre LIKE ? ORDER BY Apellido, Nombre ASC`;
    if(!apeEstudiante) apeEstudiante = '';
    if(!nombEstudiante) nombEstudiante = '';
    const response = await conexion.query(consulta,[apeEstudiante + '%',nombEstudiante + '%']);    

    return response;
}

const agregarEstudiante = async ( estudiante) =>{
    const consulta = `INSERT INTO estudiante SET ?`;

    const response = await conexion.query(consulta,[estudiante]);
    
    return response;
}

const eliminarEstudiante = async (idEstudiante) => {
    const consulta = `UPDATE estudiante SET activo = 0 WHERE idEstudiante = ?`;

    const [response] = await conexion.query(consulta,idEstudiante);    

    return response;
}

const modificarEstudiante = async (id, dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto) => {

    const consulta = 'UPDATE estudiante SET dni=?,  nombre=?, apellido=?,fechaNacimiento = ?, nacionalidad = ?, correoElectronico = ?, celular = ?, foto = ? WHERE activo = 1 AND idEstudiante = ?';

    const [estudiante] = await conexion.query(consulta, [dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto, id]);

    return estudiante;
}

module.exports = {
    buscarPorId,
    buscarPorDNI,
    buscarPorApeNomb,
    agregarEstudiante,
    eliminarEstudiante,
    modificarEstudiante,
}
