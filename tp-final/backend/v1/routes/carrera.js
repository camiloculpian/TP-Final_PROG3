const {Router} = require('express');

const { isAuthenticatedAndBedel } = require('../../middleware/auth');

const { agregar, buscar, borrar } = require('../../controllers/carrera');


const router = Router();

router.post('/add', isAuthenticatedAndBedel, agregar);

router.get('/lookup?', isAuthenticatedAndBedel, buscar);

router.delete('/delete', isAuthenticatedAndBedel, borrar);

module.exports = router;