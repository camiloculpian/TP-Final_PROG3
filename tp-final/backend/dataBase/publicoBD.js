const conexion = require('./conexionBD');

const getCarreras = async () => {
    try{
        const consulta = `SELECT 
                            idCarrera as codigo,
                            nombre AS carrera,
                            IF((modalidad=0),'Presencial','Virtual') as modalidad
                        FROM carrera 
                        WHERE activo = 1`;
        const [response] = await conexion.query(consulta);
        console.log(response);
        return response;
    }catch(e){
        console.log(e);
        return(e);
    }
}

const getMaterias = async (idCarrera) => {
    try{
        const consulta = `SELECT 
                            materia.nombre AS 'Nombre de la Materia',
                            IF((materia.tipoMateria=1),'Anual','Cuatrimestral') as Tipo,
                            materia.horasSemanales as 'Hs. Semanales'
                        FROM materia
                        LEFT JOIN carreramateria ON materia.idMateria = carreramateria.idMateria
                        WHERE materia.activo = 1 AND idCarrera=?`;
        const response = await conexion.query(consulta,[idCarrera]);
        return response;
    }catch(e){
        return(e);
    }
}


module.exports = {
    getCarreras,
    getMaterias
}

