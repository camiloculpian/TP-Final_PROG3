const materiaBD = require('../dataBase/materiaBD');

agregar = async(req, res) => {
    try{
        const idMateria = await materiaBD.agregarMateria(req.body);
            materia = [{
                // idMateria: idMateria[0]['insertId'],
                nombre: req.body.nombre,
                horasSemanales: req.body.horasSemanales,
                tipoMateria: req.body.tipoMateria,
                idCarrera: req.body.idCarrera,
                activo : 1
            }]
            res.status(200).json({status:'OK',message:'La materia se añadio correctamente', data:materia});
    }catch (excep){
        throw(excep);
    }
}

buscar = async(req, res) => {
    try{
        if(req.query['idCarrera']){
            const response = await materiaBD.buscarMateriaPorCarrera(req.query['idCarrera']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});  
        }else{
            const response = await materiaBD.buscarMateria(req.body.nombre);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (excep){
        throw excep;
    }
}

buscarPorCarrera = async(req, res) => {
    try{
        const response = await materiaBD.buscarMateriaPorCarrera(req.body.idCarrera);
        res.status(200).json({status:'OK', headers: response[1],data:response[0]});
    }catch (excep){
        throw excep;
    }
}

module.exports = {
    agregar,
    buscar
}