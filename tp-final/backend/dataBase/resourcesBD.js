const conexion = require('./conexionBD');

const getCountryList = async () => {
    const consulta = `SELECT * FROM pais`;

    const response = await conexion.query(consulta);
    
    return response;
}

module.exports = {
    getCountryList,
}