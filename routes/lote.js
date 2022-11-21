var express = require('express');
const { ValidationError } = require('sequelize');
var router = express.Router();
const ctlLote = require('../controllers/lote.js');
const { validarJWT } = require('../utils/validar-jwt');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/altaLote',validarJWT, ctlLote.altaLote);
router.get('/listarLotes/:vendido',validarJWT, ctlLote.listarLotes);
router.put('/modificarLote/:id', validarJWT, ctlLote.modificarLote);
router.get('/getLotePorPartida/:partida',validarJWT, ctlLote.getLotePorPartida);
router.post('/asociarConRemate', validarJWT, ctlLote.asociarConRemate);

module.exports = router;