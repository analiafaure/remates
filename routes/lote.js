var express = require('express');
var router = express.Router();
const ctlLote = require('../controllers/lote.js');
const { validarJWT } = require('../utils/validar-jwt');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/altaLote',validarJWT, ctlLote.altaLote);
router.get('/listarLotes',validarJWT, ctlLote.listarLotes);
//lotes no vendidos

module.exports = router;