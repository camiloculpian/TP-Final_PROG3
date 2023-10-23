const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {
    try{
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
    }catch(e){
        return e;
    }
}

const isDeleted = async (dni) => {
    try{
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
    }catch(e){
        return(e);
    }
}

const buscarPorDNI = async (dniEstudiante) => {
    try{
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
        WHERE estudiante.activo = 1 AND estudiante.dni = ?`;

        const estudiante = await conexion.query(consulta,dniEstudiante);    
        return estudiante;
    }catch(e){
        return(e);
    }
}

const buscarPorApeNomb = async (apeEstudiante,nombEstudiante) => {
    try{
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
    }catch(e){
        return(e);
    }
}

const agregarEstudiante = async ( estudiante) =>{
    try{
        const consulta = `INSERT INTO estudiante SET ?`;

        const response = await conexion.query(consulta,[estudiante]);
        
        return response;
    }catch(e){
        return(e);
    }
}

const eliminarEstudiante = async (idEstudiante) => {
    try{
        const consulta = `UPDATE estudiante SET activo = 0 WHERE idEstudiante = ?`;

        const [response] = await conexion.query(consulta,idEstudiante);    

        return response;
    }catch(e){
        return(e);
    }
}

const modificarEstudiante = async (id, dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto) => {
    try{

        const consulta = 'UPDATE estudiante SET dni=?,  nombre=?, apellido=?,fechaNacimiento = ?, nacionalidad = ?, correoElectronico = ?, celular = ?, foto = ? WHERE activo = 1 AND idEstudiante = ?';

        const [estudiante] = await conexion.query(consulta, [dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular, foto, id]);

        return estudiante;
    }catch(e){
        return(e);
    }
}

module.exports = {
    buscarPorId,
    buscarPorDNI,
    buscarPorApeNomb,
    agregarEstudiante,
    eliminarEstudiante,
    modificarEstudiante,
}
