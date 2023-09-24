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
    WHERE activo = 1 AND apellido LIKE ? AND nombre LIKE ?`;
    if(!apeEstudiante) apeEstudiante = '';
    if(!nombEstudiante) nombEstudiante = '';
    const [estudiante] = await conexion.query(consulta,[apeEstudiante + '%',nombEstudiante + '%']);    

    return estudiante;
}

const agregarEstudiante = async ( dni, apellido, nombre, fechaNacimiento, nacionalidad, correoElectronico, celular, foto) =>{
    const consulta = `INSERT INTO estudiante (dni, apellido, nombre, fechaNacimiento, nacionalidad, correoElectronico, celular, foto, activo)
                        VALUES(?,?,?,?,?,?,?,?,1)`;
    const response = await conexion.query(consulta,[parseInt(dni), apellido, nombre, fechaNacimiento,parseInt(nacionalidad),correoElectronico, celular,foto]);
    
    return response;
}

module.exports = {
    buscarPorId,
    buscarPorDNI,
    buscarPorApeNomb,
    agregarEstudiante
}
