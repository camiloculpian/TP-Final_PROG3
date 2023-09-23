const {Router} = require('express');

const { buscarPorId, buscarPorApeNomb } = require('../../controllers/estudiante');


const router = Router();


//agregar
// router.post('/estudiantes');

// //eliminar
// router.delete('/estudiantes/:idEstudiante');

// //actualizar
// router.put('/estudiantes/:idEstudiante');

// //buscar
// router.get('/estudientes');

//buscarPorID

router.get('/lookup?', buscar);

router.post('/add/dni/:apellido/:nombre/')

module.exports = router;