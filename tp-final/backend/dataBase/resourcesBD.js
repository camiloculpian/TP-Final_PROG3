const conexion = require('./conexionBD');

const getCountryList = async () => {
    try{
        const consulta = `SELECT * FROM pais`;

        const response = await conexion.query(consulta);
        
        return response;
    }catch(e){
        return(e);
    }
}

module.exports = {
    getCountryList,
}