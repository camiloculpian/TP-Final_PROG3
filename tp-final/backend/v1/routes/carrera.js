const {Router} = require('express');

const { agregar, buscar, borrar } = require('../../controllers/carrera');


const router = Router();

router.post('/add', agregar);

router.get('/lookup?', buscar);

router.delete('/delete', borrar);

module.exports = router;