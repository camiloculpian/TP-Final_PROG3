const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { agregar, buscar } = require('../../controllers/materia');

const router = Router();

router.post('/add', isAuthenticatedAndBedel, agregar);

router.get('/lookup?', isAuthenticatedAndBedel, buscar);

module.exports = router;