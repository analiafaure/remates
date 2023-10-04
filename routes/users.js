var express = require('express');
var router = express.Router();
const ctlUsuario = require('../controllers/usuario.js');
const { validarJWT } = require('../utils/validar-jwt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/altaUsuario',ctlUsuario.altaUsuario);
router.get('/listarUsuarios/:activo',validarJWT, ctlUsuario.listarUsuarios);
router.put('/modificarUsuario/:id', validarJWT, ctlUsuario.modificarUsuario);
router.get('/getUsuarioId/:id', validarJWT, ctlUsuario.getUsuarioId);
router.delete('/eliminarUsuario/:id', validarJWT, ctlUsuario.eliminarUsuario);
router.get('/listarUsuariosTipo/:tipo',validarJWT, ctlUsuario.listarUsuariosTipo);
router.get('/clientesRegitroCompleto/:completo', validarJWT, ctlUsuario.clientesRegistroCompleto);
router.post('/notificaciones',ctlUsuario.notificaciones);

module.exports = router;
