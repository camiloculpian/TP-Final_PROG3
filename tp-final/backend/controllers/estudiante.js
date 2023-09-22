const estudianteBD = require('../dataBase/estudianteBD');

buscarPorId = async(req, res) => {
    try{
        const idEstudiante = req.params.idEstudiante;   
        
        if(!idEstudiante) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const estudiante = await estudianteBD.buscarPorId(idEstudiante);

        res.json({status:'OK', data:estudiante});

    }catch (exec){
        throw exec;
    }
}


module.exports = {
    buscarPorId,
}