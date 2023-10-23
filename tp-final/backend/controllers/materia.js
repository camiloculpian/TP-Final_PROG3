const materiaBD = require('../dataBase/materiaBD');

agregar = async(req, res) => {
    try{
        const idMateria = await materiaBD.agregarMateria(req.body);
        res.status(200).json({status:'OK',message:'La materia se añadio correctamente', data:materiaBD.buscarMateriaPorId(idMateria[0]['insertId'])});
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

editar = async(req, res) => {
    try{
        
    }catch (excep){
        throw excep;
    }
}

eliminar = async(req, res) => {
    try{
        
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
    editar,
    buscar,
    eliminar
}