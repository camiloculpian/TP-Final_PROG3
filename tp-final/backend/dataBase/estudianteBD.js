const conexion = require('./conexionBD');

const buscarPorId = async (idEstudiante) => {

    const consulta = `SELECT *
    FROM estudiante 
    WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta,idEstudiante);    

    return estudiante;
}

const buscarPorApeNomb = async (apeEstudiante,nombEstudiante) => {
    console.log('const buscarPorApeNomb = async ('+apeEstudiante+','+nombEstudiante+') => {');

    const consulta = `SELECT *
    FROM estudiante 
    WHERE activo = 1 AND apellido LIKE ? AND nombre LIKE ?`;
    if(!apeEstudiante) apeEstudiante = '';
    if(!nombEstudiante) nombEstudiante = '';

    const [estudiante] = await conexion.query(consulta,[apeEstudiante + '%',nombEstudiante + '%']);    

    return estudiante;
}

module.exports = {
    buscarPorId,
    buscarPorApeNomb,
}
