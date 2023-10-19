const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { inscribirMateria, buscarMaterias, borrarInscripcionMateria } = require('../../controllers/inscripciones');

const router = Router();

router.post('inscription/carrer/add', isAuthenticatedAndBedel, agregar);

router.get('inscription/carrer/lookup?', isAuthenticatedAndBedel, buscar);

router.delete('inscription/carrer/delete', isAuthenticatedAndBedel, borrar);

module.exports = router;