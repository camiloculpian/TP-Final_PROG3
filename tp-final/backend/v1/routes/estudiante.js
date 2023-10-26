const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { buscar, borrar, agregar, editar } = require('../../controllers/estudiante');


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

router.get('/lookup?', isAuthenticatedAndBedel, buscar);

router.post('/add', isAuthenticatedAndBedel, agregar)

router.delete('/delete', isAuthenticatedAndBedel, borrar)

router.put('/edit', isAuthenticatedAndBedel, editar)


module.exports = router;