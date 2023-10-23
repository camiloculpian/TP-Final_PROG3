const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { inscribirMateria, buscarMaterias, borrarInscripcionMateria, buscarCarreras, inscribirCarrera, } = require('../../controllers/inscripciones');

const router = Router();

router.post('/career/add', isAuthenticatedAndBedel, inscribirCarrera);

router.get('/career/lookup?', buscarCarreras);

router.delete('/career/delete', isAuthenticatedAndBedel, borrar);

router.get('/course/lookup?', buscarMaterias);

module.exports = router;