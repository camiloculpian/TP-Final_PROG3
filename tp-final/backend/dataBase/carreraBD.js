const conexion = require('./conexionBD');

const agregarCarrera = async (carrera) =>{
    const consulta = `INSERT INTO carrera SET ?`;

    const response = await conexion.query(consulta,[carrera]);
    
    return response;
}

const borrarCarrera = async (idCarrera) =>{
    const consulta = `UPDATE carrera set activo=0 WHERE idCarrera = ?`;

    const response = await conexion.query(consulta,[idCarrera]);
    
    return response;
}

const buscarCarrera = async (nombre) =>{
    if(nombre){
        const consulta = `SELECT 
                            idCarrera AS ID,
                            nombre AS Nombre,
                            modalidad as Modalidad,
                            activo as Activo
                      FROM carrera 
                      WHERE activo = 1 AND nombre LIKE ?`;
        const [response] = await conexion.query(consulta,[nombre + '%']);
        return response;
    }else{
        const consulta = `SELECT 
                            idCarrera AS ID,
                            nombre AS Nombre,
                            modalidad as Modalidad,
                            activo as Activo
                      FROM carrera 
                      WHERE activo = 1`;
        const [response] = await conexion.query(consulta);
        return response;
    }
}

module.exports = {
    agregarCarrera,
    buscarCarrera,
    borrarCarrera
}