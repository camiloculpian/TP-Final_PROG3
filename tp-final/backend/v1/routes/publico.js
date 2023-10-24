const { Router } = require('express');

const { enviarCorreo, getCarreras, getMaterias } = require('../../controllers/publico');

const router = Router();


router.post('/contacto', enviarCorreo);

router.get('/carreras', getCarreras);

router.get('/carreras/info?', getMaterias);

module.exports = router;
