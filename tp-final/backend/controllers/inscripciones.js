const inscripcionesBD = require('../dataBase/inscripcionesBD');
const estudianteBD = require('../dataBase/estudianteBD');
const materiaBD = require('../dataBase/materiaBD');
const carreraBD = require('../dataBase/carreraBD');

const inscribirMateria = async(req, res) => {
    try{
        if(!isNaN(req.body.idEstudiante) && !isNaN(req.body.idMateria)){
            //TO-DO: Buscar estudiante y materia por id y ver si existen...
            estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
            materia = await materiaBD.buscarMateriaPorId(req.body.idMateria);
            if(estudiante[0].length > 0 && materia[0].length > 0){
                inscripto = await inscripcionesBD.buscarInscripcionMateria(req.body.idEstudiante, req.body.idMateria)
                if(inscripto[0].length > 0){
                    res.status(400).json({status:'ERROR', message:'ERROR el estudiante ya esta inscripto...'});
                }else{
                    const response = await inscripcionesBD.inscribirMateria(req.body['idEstudiante'],req.body['idMateria']);
                    if(response.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                    }else{
                        //TO-DO: si afected rows > 0 tuvo exito
                        res.status(200).json({status:'OK', message:'La inscripcion se ha registrado con exito'});
                    }
                }
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
            }
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
        }   
    }catch (e){
        res.status(400).json({status:'ERROR', message:e.message});
        //throw e;
    }
}

const inscribirCarrera = async(req, res) => {
    try{
        if(!isNaN(req.body.idEstudiante) && !isNaN(req.body.idCarrera)){
            //TO-DO: Buscar estudiante y carrera por id y ver si existen...
            estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
            carrera = await carreraBD.buscarCarreraPorId(req.body.idCarrera);
            if(estudiante[0].length > 0 && carrera[0].length > 0){
                inscripto = await inscripcionesBD.buscarInscripcionCarrera(req.body.idEstudiante, req.body.idCarrera)
                if(inscripto[0].length > 0){
                    res.status(400).json({status:'ERROR', message:'ERROR el estudiante ya esta inscripto...'});
                }else{
                    const response = await inscripcionesBD.inscribirCarrera(req.body['idEstudiante'],req.body['idCarrera']);
                    if(response.errno){
                        res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                    }else{
                        //TO-DO: si afected rows > 0 tuvo exito
                        res.status(200).json({status:'OK', message:'La inscripcion se ha registrado con exito'});
                    }
                }
                
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
            }   
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
        }   
    }catch (e){
        res.status(400).json({status:'ERROR', message:e.message});
        //throw e;
    }
}

const buscarMateriasInscripto = async(req, res) => {
    try{
        const response = await inscripcionesBD.buscarMaterias(req.query['idEstudiante'],req.query['idCarrera']);
        if(response.errno){
            res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
        }else{
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (e){
        res.status(400).json({status:'ERROR', message:e.message});
        //throw e;
    }
}

const buscarCarrerasInscripto = async(req, res) => {
    try{
        if(req.query['showOnlyInscripted']){
            const response = await inscripcionesBD.buscarCarrerasInscriptas(req.query['idEstudiante']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }else{
            const response = await inscripcionesBD.buscarCarreras(req.query['idEstudiante']);
            res.status(200).json({status:'OK', headers: response[1],data:response[0]});
        }
    }catch (e){
        res.status(400).json({status:'ERROR', message:e.message});
        //throw excep;
    }
}

const borrarInscripcionMateria = async (req, res) => {
    try{
        if(!isNaN(req.body.idEstudiante) && !isNaN(req.body.idMateria)){
            //TO-DO: Buscar estudiante y materia por id y ver si existen...
            estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
            materia = await materiaBD.buscarMateriaPorId(req.body.idMateria);
            if(estudiante[0].length > 0 && materia[0].length > 0){
                const response = await inscripcionesBD.borrarInscripcionMateria(req.body['idEstudiante'],req.body['idMateria']);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }else{
                    //TO-DO: si afected rows > 0 tuvo exito
                    res.status(200).json({status:'OK', message:'La inscripcion se ha eliminado con exito'});
                }
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
            }
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idMateria validos...'});
        }   
    }catch (e){
        res.status(400).json({status:'ERROR', message:e.message});
        //throw e;
    }
}

const borrarInscripcionCarrera = async (req, res) => {
    try{
        if(!isNaN(req.body.idEstudiante) && !isNaN(req.body.idCarrera)){
            //TO-DO: Buscar estudiante y carrera por id y ver si existen...
            estudiante = await estudianteBD.buscarPorId(req.body.idEstudiante);
            carrera = await carreraBD.buscarCarreraPorId(req.body.idCarrera);
            if(estudiante[0].length > 0 && carrera[0].length > 0){
                const response = await inscripcionesBD.borrarInscripcionCarrera(req.body['idEstudiante'],req.body['idCarrera']);
                if(response.errno){
                    res.status(400).json({status:'ERROR', message:'ERROR: '+response.sqlMessage});
                }else{
                    //TO-DO: si afected rows > 0 tuvo exito
                    res.status(200).json({status:'OK', message:'La inscripcion se ha eliminado con exito'});
                }
            }else{
                res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
            }      
        }else{
            res.status(400).json({status:'ERROR', message:'ERROR debe proveer idEstudiante e idCarrera validos...'});
        }   
    }catch (e){
        res.status(400).json({status:'ERROR', message:e.message});
        //throw e;
    }
}

module.exports = {
    inscribirMateria,
    buscarMateriasInscripto,
    borrarInscripcionMateria,
    borrarInscripcionCarrera,
    inscribirCarrera,
    buscarCarrerasInscripto
}