var express = require('express');
var router = express.Router();
const ctlRemate = require('../controllers/remate.js');
const { validarJWT } = require('../utils/validar-jwt');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/altaRemate',validarJWT, ctlRemate.altaRemate);
router.get('/listarRemates',validarJWT, ctlRemate.listarRemates);
router.get('/remateVigente', validarJWT, ctlRemate.remateVigente);

module.exports = router;
