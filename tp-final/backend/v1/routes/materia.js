const {Router} = require('express');

const { agregar, buscar } = require('../../controllers/materia');

const router = Router();

router.post('/add', agregar);

router.get('/lookup?', buscar);

module.exports = router;