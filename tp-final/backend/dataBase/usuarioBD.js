const conexion = require('./conexionBD');

const buscarUsuario = async (username,password) => {
    console.log(username,password);
    const consulta = `SELECT tipoUsuario,
                             CONCAT(nombre,' ',apellido) as nombre 
                       FROM usuario WHERE activo = 1 AND correoElectronico = ? AND clave = ?`;
    
    const [usuario] = await conexion.query(consulta,[username, password]);    
    console.log(usuario);
    return usuario;
}

module.exports = {
    buscarUsuario
}