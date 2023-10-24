const { Router } = require('express');

const { enviarCorreo, getCarreras } = require('../../controllers/publico');

const router = Router();


router.post('/contacto', enviarCorreo);

router.get('/carreras', getCarreras);

module.exports = router;
