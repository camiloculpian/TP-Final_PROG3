const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { inscribirMateria, buscarMateriasInscripto, borrarInscripcionMateria, borrarInscripcionCarrera, buscarCarrerasInscripto, inscribirCarrera, } = require('../../controllers/inscripciones');

const router = Router();

router.post('/career/add', isAuthenticatedAndBedel, inscribirCarrera);

router.get('/career/lookup?', buscarCarrerasInscripto);

router.delete('/career/delete', isAuthenticatedAndBedel, borrarInscripcionCarrera);

router.post('/course/add', isAuthenticatedAndBedel, inscribirMateria);

router.get('/course/lookup?', buscarMateriasInscripto);

router.delete('/course/delete', isAuthenticatedAndBedel, borrarInscripcionMateria);

module.exports = router;