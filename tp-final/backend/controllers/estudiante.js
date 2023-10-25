const { query } = require('../dataBase/conexionBD');
const estudianteBD = require('../dataBase/estudianteBD');

buscar = async(req, res) => {
    //BUSCA SEGUN CRITERIO PROVISTO, SI NO RETORNA UNA LISTA CON TODOS LOS ESTUDIANTES
    try{
        if(req.query['id']){
            const response = await estudianteBD.buscarPorId(req.query['id']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }else if(req.query['dni']){
            const response = await estudianteBD.buscarPorDNI(req.query['dni']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }else{
            const response = await estudianteBD.buscarPorApeNomb(req.query['apellido'], req.query['nombre']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR', message:excep});
        throw excep;
    }
}

agregar = async(req, res) => {
    try{
        //TIRAR ERROR Y EL ESTUDIANTE SI ESTE YA EXISTE(BUSCAR POR DNI)
        if(req.body.dni && req.body.nombre && req.body.apellido && req.body.nacionalidad ){
            let estudiante = await estudianteBD.buscarPorDNI(req.body.dni);
            if(!estudiante[0].length){
                const idEstudiante = await estudianteBD.agregarEstudiante(req.body);
                //VER SI EL ESTUDIANTE FUE RETORNADO DE MANERA CORRECTA
                [estudiante] =  await estudiateDB.buscarPorId(idEstudiante[0]['insertId']);
                res.status(200).json({status:'OK',message:'El estudiante se agrego correctamente', data:estudiante});
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR: Ya existe un estudiante con el num de dni ingresado!!!', data:estudiante});
            }
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR: Faltan datos OBLIGATORIOS!!!'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR', message:excep});
        throw(excep);
    }
}

eliminar = async(req, res) => {
    try{
        if(parseInt(req.body.idEstudiante)){
            const estudiante = await estudianteBD.eliminarEstudiante(req.body.idEstudiante);
            console.log(estudiante.affectedRows);
            if(!estudiante.length && estudiante.affectedRows == 1){
                res.status(200).json({status:'OK',message:'El estudiante se eliminó correctamente'});
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR: No se encontró el estudiante!!!'});
            }
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR: idEstudiante debe ser un valor valido'});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR', message:excep});
        throw (excep);
    }
}

test = async(req, res) => {
    try{
        console.log(req)
        res.status(200).json({status:'OK',message:'Bienvenido!!!'})
    }catch (excep){
        res.status(400).json({status:'ERROR', message:excep});
        throw (excep);
    }
}

modificar = async(req, res) => {
    try{
        let estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
        //CONTROLAR DATOS OBLIGATORIOS
        if(estudiante.length){
            const respuesta = await estudianteBD.modificarEstudiante(parseInt(req.body.idEstudiante),parseInt(req.body.dni),req.body.nombre,req.body.apellido,req.body.fechaNacimiento,parseInt(req.body.nacionalidad),req.body.correoElectronico,req.body.celular,req.body.foto);
            const response = await estudianteBD.buscarPorId(req.body.idEstudiante);
            res.status(200).json({status:'OK',message:'El estudiante se modifico correctamente', data:response[0]});
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR: El estudiante no existe o esta dado de baja...', data:[{}]});
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