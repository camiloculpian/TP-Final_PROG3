const { query } = require('../dataBase/conexionBD');
const estudianteBD = require('../dataBase/estudianteBD');

buscar = async(req, res) => {
    try{
        if(req.query['id']){
            const estudiante = await estudianteBD.buscarPorId(req.query['id']);
            res.json({status:'OK', data:estudiante});
        }else{
            const estudiante = await estudianteBD.buscarPorApeNomb(req.query['apellido'], req.query['nombre']);
            res.json({status:'OK', data:estudiante});
        }
    }catch (exec){
        throw exec;
    }
}

module.exports = {
    buscar
}