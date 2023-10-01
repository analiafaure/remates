var express = require('express');
var router = express.Router();
var ctrCargaLote = require('../controllers/datos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cargaLote',ctrCargaLote.cargarLote);

module.exports = router;
