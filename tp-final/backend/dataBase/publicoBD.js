const conexion = require('./conexionBD');

const getCarreras = async () => {
    try{
        const consulta = `SELECT 
                            idCarrera as codigo,
                            nombre AS carrera,
                            IF((modalidad=0),'Presencial','Virtual') as modalidad
                        FROM carrera 
                        WHERE activo = 1`;
        const response = await conexion.query(consulta);
        console.log(response);
        return response;
    }catch(e){
        console.log(e);
        return(e);
    }
}



module.exports = {
    getCarreras
}

