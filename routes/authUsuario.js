
    const auth = require('../controllers/authUsuario');
    var router = require('express').Router();
    const { validarJWT } = require('../utils/validar-jwt');


    // login 
    router.post("/login", auth.login);
    
    // recuperar clave
    router.get('/recuperarClave/:email', auth.recuperarClave);
    
    // revalidar token
    // antes de ir a la ruta valida el token con el middleware validarJWT, en caso de ser valido sigue.. sino error
    router.get('/revalidarToken', validarJWT, auth.revalidarToken);

module.exports = router;