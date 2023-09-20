const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN nacionalidad = 0 THEN 'arg'
        WHEN nacionalidad = 1 THEN 'uru'
        WHEN nacionalidad = 2 THEN 'chi'
        WHEN nacionalidad = 3 THEN 'par'
        WHEN nacionalidad = 4 THEN 'bra'
        WHEN nacionalidad = 5 THEN 'bol'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}

// const crear = async () => {}
// const editar = async () => {}
// const buscarTodos = async () => {}
// const eliminar = async () => {}

module.exports = {
    buscarPorId,
}
