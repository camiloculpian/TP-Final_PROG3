const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { inscribirMateria, buscarMaterias, borrarInscripcionMateria, buscarCarreras } = require('../../controllers/inscripciones');

const router = Router();

router.post('/carrer/add', isAuthenticatedAndBedel, agregar);

router.get('/carrer/lookup?', buscarCarreras);

router.delete('/carrer/delete', isAuthenticatedAndBedel, borrar);

router.get('/course/lookup?', buscarMaterias);

module.exports = router;