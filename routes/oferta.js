var express = require('express');
var router = express.Router();
const ctlOferta = require('../controllers/oferta.js');
const { validarJWT } = require('../utils/validar-jwt');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/altaOferta',validarJWT, ctlOferta.altaOferta);
router.get('/listarOfertasCliente/:cliente',validarJWT,ctlOferta.listarOfertasCliente);
router.get('/ofertaMax/:lote/:remate',validarJWT, ctlOferta.ofertaMax);
router.get('/ganadoresRemate/:remate',validarJWT, ctlOferta.ganadoresRemate);
module.exports = router;