const {Router} = require('express');

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

router.get('/lookup?', buscar);

router.post('/add', agregar)

router.delete('/delete', eliminar)

router.put('/edit', modificar)


module.exports = router;