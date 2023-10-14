const {Router} = require('express');

const { isAuthenticated, isAuthenticatedAndBedel } = require('../../middleware/auth');

const { buscar, eliminar, agregar, modificar } = require('../../controllers/estudiante');


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

router.delete('/delete', isAuthenticatedAndBedel, eliminar)

router.put('/edit', isAuthenticatedAndBedel, modificar)


module.exports = router;