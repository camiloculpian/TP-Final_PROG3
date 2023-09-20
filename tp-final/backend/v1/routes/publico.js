const { Router } = require('express');

const { enviarCorreo } = require('../../controladores/publico');

const router = Router();


router.post('/contacto', enviarCorreo);

module.exports = router;
