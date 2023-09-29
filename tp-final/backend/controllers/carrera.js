const { query } = require('../dataBase/conexionBD');
const carreraBD = require('../dataBase/carreraBD');

agregar = async(req, res) => {
    try{
        //TIRAR ERROR Y EL ESTUDIANTE SI ESTE YA EXISTE(BUSCAR POR DNI)
        // let carrera = await carreraBD.buscarPorNombre(req.body.nombre);
        // if(!carrera.length){
            // const idEstudiante = await estudianteBD.agregarEstudiante(req.body.dni, req.body.apellido, req.body.nombre, req.body.fechaNacimiento, req.body.nacionalidad, req.body.correoElectronico, req.body.celular, req.body.foto);
            const idCarrera = await carreraBD.agregarCarrera(req.body);
            carrera = [{
                idCarrera: idCarrera[0]['insertId'],
                nombre: req.body.nombre,
                modalidad: req.body.modalidad,
                activo: 1
            }]
            res.status(200).json({status:'OK',message:'La carrera se añadio correctamente', data:carrera});
        // }else{
            // res.status(200).json({status:'ERROR', message:'ERROR: Ya existe un una carrera con ese nombre', data:carrera});
        // }
    }catch (excep){
        throw(excep);
    }
}

buscar = async(req, res) => {
    try{
        const carrera = await carreraBD.buscarCarrera(req.body.nombre);
        res.status(200).json({status:'OK', data:carrera});
    }catch (excep){
        throw excep;
    }
}

borrar = async(req, res) => {
    try{
        const carrera = await carreraBD.borrarCarrera(req.body.idCarrera);
        res.status(200).json({status:'OK', data:carrera});
    }catch (excep){
        throw excep;
    }
}

module.exports = {
                  agregar,
                  buscar,
                  borrar
}