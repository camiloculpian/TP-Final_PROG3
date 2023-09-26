const {Router} = require('express');

const { buscarUsuaio } = require('../../controllers/usuario');


const router = Router();

router.post('/login', buscarUsuario);

module.exports = router;