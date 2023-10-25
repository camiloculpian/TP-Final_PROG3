const { query } = require('../dataBase/conexionBD');
const estudianteBD = require('../dataBase/estudianteBD');

buscar = async(req, res) => {
    //BUSCA SEGUN CRITERIO PROVISTO, SI NO RETORNA UNA LISTA CON TODOS LOS ESTUDIANTES
    try{
        if(req.query['id']){
            const response = await estudianteBD.buscarPorId(req.query['id']);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }else if(req.query['dni']){
            const response = await estudianteBD.buscarPorDNI(req.query['dni']);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }else{
            const response = await estudianteBD.buscarPorApeNomb(req.query['apellido'], req.query['nombre']);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (excep){
        res.status(400).json({status:'ERROR', message:excep});
        throw excep;
    }
}

agregar = async(req, res) => {
    try{
        if(req.body.dni && req.body.nombre && req.body.apellido && req.body.nacionalidad ){
            let estudiante = await estudianteBD.buscarPorDNI(req.body.dni);
            if(!estudiante[0].length){
                response = await estudianteBD.agregarEstudiante(req.body);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }
                response =  await estudiateDB.buscarPorId(response[0]['insertId']);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }
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
            const response = await estudianteBD.eliminarEstudiante(req.body.idEstudiante);
            if(response.errno){
                res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
            }
            if(response.affectedRows == 1){
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

modificar = async(req, res) => {
    try{
        if(req.body.idEstudiante && req.body.dni && req.body.nombre && req.body.apellido && req.body.nacionalidad ){
            let estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
            if(estudiante.length){
                response = await estudianteBD.modificarEstudiante(parseInt(req.body.idEstudiante),parseInt(req.body.dni),req.body.nombre,req.body.apellido,req.body.fechaNacimiento,parseInt(req.body.nacionalidad),req.body.correoElectronico,req.body.celular,req.body.foto);
                response = await estudianteBD.buscarPorId(req.body.idEstudiante);
                res.status(200).json({status:'OK',message:'El estudiante se modifico correctamente', data:response[0]});
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR: El estudiante no existe o esta dado de baja...', data:[{}]});
            }
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR: faltan datos OBLIGATORIOS!', data:[{}]});
        }
    }catch (excep){
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

module.exports = {
    buscar,
    agregar,
    eliminar,
    modificar,
    test
}