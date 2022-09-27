var express = require('express');
var router = express.Router();
const ctlUsuario = require('../controllers/usuario.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/altaUsuario',ctlUsuario.altaUsuario);
router.get('/listarUsuarios',ctlUsuario.listarUsuarios);

module.exports = router;
