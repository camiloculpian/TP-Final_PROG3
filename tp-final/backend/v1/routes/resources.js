const {Router} = require('express');

const {getCountryList} = require('../../controllers/resources');

const router = Router();

router.get('/countryList', getCountryList);

module.exports = router;