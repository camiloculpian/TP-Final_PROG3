const conexion = require('./conexionBD');

// const conexion = require('./conexionBD');

const agregarMateria = async (materia) => {
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
}

const buscarMateria = async (nombre) => {
    const consulta = `SELECT 
                        materia.idMateria AS ID,
                        materia.nombre AS Nombre,
                        materia.tipoMateria as Tipo,
                        materia.horasSemanales as 'Hs. Sem.',
                        carrera.nombre as Carrera
                    FROM materia, carrera, carreramateria
                    WHERE materia.activo = 1 AND materia.nombre LIKE ? AND materia.idMateria = carreramateria.idMateria AND carrera.idCarrera = carreramateria.idCarrera
                    ORDER BY carrera.nombre, materia.nombre`;
    if(!nombre) nombre = '';
    const response = await conexion.query(consulta,[nombre + '%']);
    return response;
}

const buscarMateriaPorCarrera = async (idCarrera) => {
    const consulta = `SELECT 
                        materia.idMateria AS ID,
                        materia.nombre AS Nombre,
                        materia.tipoMateria as Tipo,
                        materia.horasSemanales as 'Horas Semanales'
                    FROM materia
                    LEFT JOIN carreramateria ON materia.idMateria = carreramateria.idMateria
                    WHERE materia.activo = 1 AND idCarrera=?`;
    const response = await conexion.query(consulta,[idCarrera]);
    return response;
}

module.exports = {
    agregarMateria,
    buscarMateria,
    buscarMateriaPorCarrera
}