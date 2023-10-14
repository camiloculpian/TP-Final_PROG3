const conexion = require('./conexionBD');

/*FOR LOGIN */
const buscarIDUsuario = async (username,password) => {
    const consulta = `SELECT idUsuario,
                             tipoUsuario
                      FROM usuario WHERE activo = 1 AND correoElectronico = ? AND clave = ?`;
    
    const [usuario] = await conexion.query(consulta,[username, password]);    
    return usuario;
}

const buscarUsuario = async (username,password) => {
    const consulta = `SELECT idUsuario,
                             correoElectronico,
                             tipoUsuario,
                             CONCAT(nombre,' ',apellido) as nombre 
                       FROM usuario WHERE activo = 1 AND correoElectronico = ? AND clave = ?`;
    
    const [usuario] = await conexion.query(consulta,[username, password]);    
    return usuario;
}

const buscarUsuarioPorID = async (idUsuario) => {
    console.log('ENTERING -> const buscarUsuarioPorID = async (idUsuario: '+idUsuario+')');
    const consulta = `SELECT * FROM usuario WHERE activo = 1 AND idUsuario = ?`;
    const [usuario] = await conexion.query(consulta,[idUsuario]);
    console.log('LEAVING <- const buscarUsuarioPorID = async (idUsuario: '+idUsuario+')'); 
    return usuario;
}

module.exports = {
    buscarIDUsuario,
    buscarUsuario,
    buscarUsuarioPorID
}