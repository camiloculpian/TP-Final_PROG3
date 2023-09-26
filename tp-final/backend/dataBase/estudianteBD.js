const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {
    const consulta = `SELECT
                            idEstudiante AS ID,
                            dni AS DNI,
                            apellido AS Apellido,
                            nombre AS Nombre,
                            DATE_FORMAT(fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            nacionalidad as Nacionalidad,
                            correoElectronico AS 'e-m@il',
                            celular as Celular
    FROM estudiante 
    WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}

const buscarPorDNI = async (dniEstudiante) => {
    const consulta = `SELECT
                            idEstudiante AS ID,
                            dni AS DNI,
                            apellido AS Apellido,
                            nombre AS Nombre,
                            DATE_FORMAT(fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            nacionalidad as Nacionalidad,
                            correoElectronico AS 'e-m@il',
                            celular as Celular
    FROM estudiante 
    WHERE activo = 1 AND dni = ?`;

    const [estudiante] = await conexion.query(consulta,dniEstudiante);    

    return estudiante;
}

const buscarPorApeNomb = async (apeEstudiante,nombEstudiante) => {
    const consulta = `SELECT
                            idEstudiante AS ID,
                            dni AS DNI,
                            apellido AS Apellido,
                            nombre AS Nombre,
                            DATE_FORMAT(fechaNacimiento, "%Y-%m-%d") AS 'Fecha Nac.',
                            nacionalidad as Nacionalidad,
                            correoElectronico AS 'e-m@il',
                            celular as Celular
                            
    FROM estudiante 
    WHERE activo = 1 AND apellido LIKE ? AND nombre LIKE ? ORDER BY Apellido, Nombre ASC`;
    if(!apeEstudiante) apeEstudiante = '';
    if(!nombEstudiante) nombEstudiante = '';
    const [estudiante] = await conexion.query(consulta,[apeEstudiante + '%',nombEstudiante + '%']);    

    return estudiante;
}

// const agregarEstudiante = async ( dni, apellido, nombre, fechaNacimiento, nacionalidad, correoElectronico, celular, foto) =>{
    // const consulta = `INSERT INTO estudiante (dni, apellido, nombre, fechaNacimiento, nacionalidad, correoElectronico, celular, foto, activo)
    //                     VALUES(?,?,?,?,?,?,?,?,1)`;
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
