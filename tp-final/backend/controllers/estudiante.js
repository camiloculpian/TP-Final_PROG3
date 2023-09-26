const { query } = require('../dataBase/conexionBD');
const estudianteBD = require('../dataBase/estudianteBD');

buscar = async(req, res) => {
    try{
        if(req.query['id']){
            const estudiante = await estudianteBD.buscarPorId(req.query['id']);
            res.json({status:'OK', data:estudiante});
        }else if(req.query['dni']){
            const estudiante = await estudianteBD.buscarPorDNI(req.query['dni']);
            res.json({status:'OK', data:estudiante});
        }else{
            const estudiante = await estudianteBD.buscarPorApeNomb(req.query['apellido'], req.query['nombre']);
            res.json({status:'OK', data:estudiante});
        }
    }catch (excep){
        throw excep;
    }
}

agregar = async(req, res) => {
    try{
        //TIRAR ERROR Y EL ESTUDIANTE SI ESTE YA EXISTE(BUSCAR POR DNI)
        let estudiante = await estudianteBD.buscarPorDNI(req.body.dni);
        if(!estudiante.length){
            // const idEstudiante = await estudianteBD.agregarEstudiante(req.body.dni, req.body.apellido, req.body.nombre, req.body.fechaNacimiento, req.body.nacionalidad, req.body.correoElectronico, req.body.celular, req.body.foto);
            const idEstudiante = await estudianteBD.agregarEstudiante(req.body);
            estudiante = [{
                idEstudiante: idEstudiante[0]['insertId'],
                dni: parseInt(req.body.dni),
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fechaNacimiento: req.body.fechaNacimiento,
                nacionalidad: parseInt(req.body.nacionalidad),
                correoElectronico: req.body.correoElectronico,
                celular: req.body.celular,
                foto: req.body.foto,
                activo: 1
            }]
            res.json({status:'OK',message:'El estudiante se agrego correctamente', data:estudiante});
        }else{
            res.json({status:'ERROR', message:'ERROR: Ya existe un estudiante con el num de dni ingresado!!!', data:estudiante});
        }
    }catch (excep){
        throw(excep);
    }
}

eliminar = async(req, res) => {
    try{
        // const estudiante = await estudianteBD.buscarPorId(req.query['id']);
        const estudiante = await estudianteBD.eliminarEstudiante(parseInt(req.body.idEstudiante));

        if(!estudiante.length){
            res.json({status:'OK',message:'El estudiante se eliminó correctamente'});
        }else{
            res.json({status:'ERROR', message:'ERROR: No se encontró el estudiante!!!'});
        }
    }catch (excep){
        throw (excep);
    }
}

test = async(req, res) => {
    try{
        console.log(req)
        res.json({status:'OK',message:'Bienvenido!!!'})
    }catch (excep){
        throw (excep);
    }
}

modificar = async(req, res) => {
    try{
        let estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
        if(estudiante.length){
            const respuesta = await estudianteBD.modificarEstudiante(parseInt(req.body.idEstudiante),parseInt(req.body.dni),req.body.nombre,req.body.apellido,req.body.fechaNacimiento,parseInt(req.body.nacionalidad),req.body.correoElectronico,req.body.celular,req.body.foto);
            estudiante = [{
                idEstudiante: (req.body.id),
                dni: parseInt(req.body.dni),
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fechaNacimiento: req.body.fechaNacimiento,
                nacionalidad: parseInt(req.body.nacionalidad),
                correoElectronico: req.body.correoElectronico,
                celular: req.body.celular,
                foto: req.body.foto
            }]
            res.status(200).json({status:'OK',message:'El estudiante se modifico correctamente', data:estudiante});
        }else{
            res.json({status:'ERROR', message:'ERROR: El estudiante no existe o esta dado de baja...', data:[{}]});
        }
    }catch (excep){
        throw (excep);
    }
}

module.exports = {
    buscar,
    agregar,
    eliminar,
    modificar,
    test
}