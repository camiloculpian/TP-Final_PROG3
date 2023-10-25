const conexion = require('./conexionBD');

// const conexion = require('./conexionBD');

const agregarMateria = async (materia) => {
    try{
        const connection = await conexion.getConnection();
        try {
            await connection.beginTransaction();
            const consulta = `INSERT INTO materia (nombre, horasSemanales, tipoMateria) VALUES (?,?,?)`;
            const response = await connection.query(consulta,[materia.nombre, materia.horasSemanales, materia.tipoMateria]);
            const consulta2 = 'INSERT INTO carreramateria (idCarrera, idMateria) VALUES (?,?)'
            await connection.query(consulta2,[materia.idCarrera, response[0].insertId]);
            await connection.commit();
            return response;
        } catch (error) {
            console.error("agregarMateria, an error occurred:", error);
            return(error);
        } finally {
            connection.release();
        }
    }catch(e){
        return(e);
    }
}

const buscarMateria = async (nombre) => {
    try{
        const consulta = `SELECT 
                            materia.idMateria AS idMateria,
                            materia.nombre AS Nombre,
                            materia.tipoMateria as Tipo,
                            materia.horasSemanales as 'Hs. Sem.',
                            carrera.idCarrera as idCarrera,
                            carrera.nombre as Carrera
                        FROM materia, carrera, carreramateria
                        WHERE materia.activo = 1 AND materia.nombre LIKE ? AND materia.idMateria = carreramateria.idMateria AND carrera.idCarrera = carreramateria.idCarrera
                        ORDER BY carrera.nombre, materia.nombre`;
        if(!nombre) nombre = '';
        const response = await conexion.query(consulta,[nombre + '%']);
        return response;
    }catch(e){
        return(e);
    }
}

const eliminarMateria = async (idMateria) => {
    try{
        const consulta = `UPDATE materia SET activo=0 WHERE activo=1 AND idMateria=?`;
        const response = await conexion.query(consulta,idMateria);
        return response[0];
    }catch(e){
        return(e);
    }
}

const buscarMateriaPorId = async (idMateria) => {
    try{
        const consulta = `SELECT 
                            materia.idMateria AS idMateria,
                            materia.nombre AS Nombre,
                            materia.tipoMateria as Tipo,
                            materia.horasSemanales as 'Hs. Sem.',
                            carrera.idCarrera as idCarrera,
                            carrera.nombre as Carrera
                        FROM materia
                        WHERE materia.activo = 1 AND materia.idMateria = ?`;
        if(!nombre) nombre = '';
        const response = await conexion.query(consulta,[idMateria]);
        return response;
    }catch(e){
        return(e);
    }
}

const buscarMateriasPorCarrera = async (idCarrera) => {
    try{
        const consulta = `SELECT 
                            materia.idMateria AS idMateria,
                            materia.nombre AS Nombre,
                            materia.tipoMateria as Tipo,
                            materia.horasSemanales as 'Hs. Sem.',
                            carrera.idCarrera as idCarrera,
                            carrera.nombre as Carrera
                        FROM materia, carrera, carreramateria
                        WHERE materia.activo = 1 AND materia.idMateria = carreramateria.idMateria AND carrera.idCarrera = carreramateria.idCarrera AND carrera.idCarrera = ?`;
        const response = await conexion.query(consulta,[idCarrera]);
        return response;
    }catch(e){
        console.log(e);
        return(e);
    }
}

const buscarMateriasPorCarreraNombre = async (idCarrera,nombre) => {
    try{
        const consulta = `SELECT 
                            materia.idMateria AS idMateria,
                            materia.nombre AS Nombre,
                            materia.tipoMateria as Tipo,
                            materia.horasSemanales as 'Hs. Sem.',
                            carrera.idCarrera as idCarrera,
                            carrera.nombre as Carrera
                        FROM materia, carrera, carreramateria
                        WHERE materia.activo = 1 
                                AND materia.idMateria = carreramateria.idMateria 
                                AND carrera.idCarrera = carreramateria.idCarrera 
                                AND carrera.idCarrera = ?
                                AND materia.nombre LIKE ?`;
        if(!nombre) nombre = '';
        const response = await conexion.query(consulta,[idCarrera,nombre + '%']);
        return response;
    }catch(e){
        console.log(e)
        return(e);
    }
}

const buscarMateriasPorCarreraNombreExacto = async (idCarrera,nombre) => {
    try{
        const consulta = `SELECT 
                            materia.idMateria AS idMateria,
                            materia.nombre AS Nombre,
                            materia.tipoMateria as Tipo,
                            materia.horasSemanales as 'Hs. Sem.',
                            carrera.idCarrera as idCarrera,
                            carrera.nombre as Carrera
                        FROM materia, carrera, carreramateria
                        WHERE materia.activo = 1 
                                AND materia.idMateria = carreramateria.idMateria 
                                AND carrera.idCarrera = carreramateria.idCarrera 
                                AND carrera.idCarrera = ?
                                AND materia.nombre = ?`;
        if(!nombre) nombre = '';
        const response = await conexion.query(consulta,[idCarrera,nombre]);
        return response;
    }catch(e){
        console.log(e)
        return(e);
    }
}

module.exports = {
    agregarMateria,
    buscarMateria,
    eliminarMateria,
    buscarMateriaPorId,
    buscarMateriasPorCarrera,
    buscarMateriasPorCarreraNombre,
    buscarMateriasPorCarreraNombreExacto
}