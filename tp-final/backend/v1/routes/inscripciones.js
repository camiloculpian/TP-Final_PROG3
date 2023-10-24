const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { inscribirMateria, buscarMaterias, borrarInscripcionMateria, borrarInscripcionCarrera, buscarCarreras, inscribirCarrera, } = require('../../controllers/inscripciones');

const router = Router();

router.post('/career/add', isAuthenticatedAndBedel, inscribirCarrera);

router.get('/career/lookup?', buscarCarreras);

router.delete('/career/delete', isAuthenticatedAndBedel, borrarInscripcionCarrera);

router.post('/course/add', isAuthenticatedAndBedel, inscribirMateria);

router.get('/course/lookup?', buscarMaterias);

router.delete('/course/delete', isAuthenticatedAndBedel, borrarInscripcionMateria);

module.exports = router;