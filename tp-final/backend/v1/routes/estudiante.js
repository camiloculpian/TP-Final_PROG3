const {Router} = require('express');

const { buscarPorId } = require('../../controllers/estudiante');



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
router.get('/estudiantes/:idEstudiante', buscarPorId);



module.exports = router;