const conexion = require('./conexionBD');

const agregarCarrera = async (carrera) =>{
    try{
        const consulta = `INSERT INTO carrera SET ?`;

        const response = await conexion.query(consulta,[carrera]);
        
        return response;
    }catch(e){
        return(e);
    }
}

const borrarCarrera = async (idCarrera) =>{
    try{
        const consulta = `UPDATE carrera set activo=0 WHERE idCarrera = ?`;

        const response = await conexion.query(consulta,[idCarrera]);
        
        return response;
    }catch(e){
        return(e);
    }
}

const buscarCarrera = async (nombre,isInscribed) =>{
    try{
        const consulta = `SELECT 
                            idCarrera AS idCarrera,
                            nombre AS Nombre,
                            modalidad as Modalidad,
                            activo as Activo
                        FROM carrera 
                        WHERE activo = 1 AND nombre LIKE ?`;
        if(!nombre) nombre = '';
        const response = await conexion.query(consulta,[nombre + '%']);
        return response;
    }catch(e){
        return(e);
    }
}

module.exports = {
    agregarCarrera,
    buscarCarrera,
    borrarCarrera
}