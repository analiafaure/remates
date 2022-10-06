const { response } = require("express")
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // leo el token que viene por el header, 
    // es un header personalizado, mas complejo pero no infalible...
    const token = req.header('x-token');
    
    if(!token){
        // error 401 usuario no autenticado
        return res.status(401).json({
            ok: false,
            msg:'error en el token',
        })    
    }

    try{
        const {correo, tipoUsuario, idUsuario} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.correo = correo;
        req.tipoUsuario = tipoUsuario;
        req.idUsuario = idUsuario;

    }catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Token no válido',
        })
    }

    next();
}


module.exports = {
    validarJWT
}
