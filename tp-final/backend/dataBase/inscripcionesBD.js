const conexion = require('./conexionBD');

buscarCarreras = async(req, res) => {
    //toma el idUsuario y devuelve lista de carreras con un campo extra que dice si esta inscripto o no
}

buscarMaterias = async(req, res) => {
    //toma el idUsuario i el idCarrera y devuelve lista de materias con un campo extra que dice si esta inscripto o no
}

module.exports = {
    inscribirMateria,
    buscarMaterias,
    borrarInscripcionMateria
}