// generacion del json web token

const jwt = require('jsonwebtoken');

// genera el jwt creado una promesa
// const generarJWT = (correo, tipoUsuario, nombre, apellido) => {
const generarJWT = (correo, tipoUsuario, idUsuario) => {
    const payload = {correo, tipoUsuario, idUsuario};
    // jwt.sign no trabaja con promesas, por este motivo creo el new promise
    return new Promise ((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '5h'
        }, (err, token) => {
            if (err) {
                // todo mal, ejecuta el reject del promise
                console.log(err);
                reject(err);
            }else{
                // todo ok, se ejecuta con el resolve del promise
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}