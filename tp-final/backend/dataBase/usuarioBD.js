const conexion = require('./conexionBD');

/*FOR LOGIN */
const buscarIDUsuario = async (username,password) => {
    try{
        const consulta = `SELECT idUsuario,
                                tipoUsuario
                        FROM usuario WHERE activo = 1 AND correoElectronico = ? AND clave = ?`;
        
        const [usuario] = await conexion.query(consulta,[username, password]);    
        return usuario[0];
    }catch(e){
        return(e);
    }
}

const buscarUsuario = async (username,password) => {
    try{
        const consulta = `SELECT idUsuario,
                                correoElectronico,
                                tipoUsuario,
                                CONCAT(nombre,' ',apellido) as nombre 
                        FROM usuario WHERE activo = 1 AND correoElectronico = ? AND clave = ?`;
        
        const usuario = await conexion.query(consulta,[username, password]);   
        // console.log(usuario); 
        return usuario[0];
    }catch(e){
        return(e);
    }
}

const buscarUsuarioPorID = async (idUsuario) => {
    try{
        // console.log('ENTERING -> const buscarUsuarioPorID = async (idUsuario: '+idUsuario+')');
        const consulta = `SELECT * FROM usuario WHERE activo = 1 AND idUsuario = ?`;
        const usuario = await conexion.query(consulta,[idUsuario]);
        // console.log(usuario);
        // console.log('LEAVING <- const buscarUsuarioPorID = async (idUsuario: '+idUsuario+')'); 
        return usuario[0];
    }catch(e){
        return(e);
    }
}

module.exports = {
    buscarIDUsuario,
    buscarUsuario,
    buscarUsuarioPorID
}