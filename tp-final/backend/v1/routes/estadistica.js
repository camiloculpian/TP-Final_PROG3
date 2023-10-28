const {Router} = require('express');

const { isAuthenticatedAndDecano } = require('../../middleware/auth');

const { obtenerEstadisticaMaterias, obtenerEstadisticaCarreras, obtenerEstadisticaEstudiantes } = require('../../controllers/estadistica');

const router = Router();

router.get('/carrera?', isAuthenticatedAndDecano, obtenerEstadisticaCarreras);

router.get('/materia?', isAuthenticatedAndDecano, obtenerEstadisticaMaterias);

router.get('/estudiante?', isAuthenticatedAndDecano, obtenerEstadisticaEstudiantes);

module.exports = router;