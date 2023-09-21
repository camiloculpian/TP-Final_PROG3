const { Router } = require('express');

const { enviarCorreo } = require('../../controllers/publico');

const router = Router();


router.post('/contacto', enviarCorreo);

module.exports = router;
