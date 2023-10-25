const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { agregar, buscar, eliminar } = require('../../controllers/materia');

const router = Router();

router.post('/add', isAuthenticatedAndBedel, agregar);

router.get('/lookup?', isAuthenticatedAndBedel, buscar);

router.delete('/delete', isAuthenticatedAndBedel, eliminar);

module.exports = router;