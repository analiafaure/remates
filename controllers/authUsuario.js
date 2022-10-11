const bcrypt = require('bcryptjs');
const Usuario = require('../models').Usuario;
const { generarJWT } = require('../utils/jwt');
const nodemailer = require('nodemailer');

// login de usuario
exports.login = async (req, res, next) => {
  try{
    // busco el usuario con el email recibido
   const usuarioDb = await Usuario.findOne({ where : {email : req.body.email }});
    
    // si el usuario existe
    if(usuarioDb){
      
      // comparo las claves recibidas y almacenadas
      const clave_ok = bcrypt.compareSync(req.body.clave, usuarioDb.clave);

      if(clave_ok){
        // genero el token
        await generarJWT(req.body.email, usuarioDb.tipoUsuario, usuarioDb.id).then(data =>
          {
          res.status(200).json({ 
            ok:true,
            id: usuarioDb.id,
            nombre: usuarioDb.nombre,
            apellido: usuarioDb.apellido,
            tipoUsuario: usuarioDb.tipoUsuario,
            email: usuarioDb.email,
            primerLogin: usuarioDb.primerLogin,
            reinicioClave: usuarioDb.reinicioClave,
            token : data
        })
        }).catch(err =>{
          return res.status(404).json({
            error: err,
            ok: false,
            msg:'Error al generar token'
        })
      });

      } else {
        res.status(400).json({ 
          ok: false,
          msg : "Contraseña incorrecta" 
        });
      }
    
    }else{
      res.status(404).json({ 
        ok: false,
        msg : "El usuario no esta registrado." 
      });
    }
  }catch (error) {
     return res.status(500).json({
        error: err,
        ok: false,
        msg:'Error haciendo login, informar al administrador.'
    })
  }  
}


// resetea la clave del usuario, si existe
exports.recuperarClave = async (req, res, next) => {
  try{
      const {email} = req.params;
      // busco el usuario con el email recibido
      const usuarioDb = await Usuario.findOne({ where : {email : email }});
      
      // si el usuario existe
      if(usuarioDb){
        // nueva clave para enviar al usuario por email
        const aux = Math.random().toString(36).substring(7);

        // hasheo la passwd
        const salt = bcrypt.genSaltSync();
        claveHash = bcrypt.hashSync(aux, salt);
        // console.log('nueva clave: ', aux);
        
        // actualizo el registro de clave del usuario ;)
        Usuario.update({clave : claveHash},  {where: { id: usuarioDb.id }})
        .then(num => {
          if (num == 1) {
            let transporter = nodemailer.createTransport({
              service:'gmail',
              auth: {
                        user:process.env.CORREO,
                        pass:process.env.CLAVE
                        }
              });

            let cuerpoemail = "<h1>Hola " + usuarioDb.nombre + " </h1>"+
                                "<p> Recibimos una solicitud para resetear su contraseña</p>"+
                                "<p>Nueva contraseña:  " + aux + "</p>"+
                                "<p><h4>Rogamos que modifique la misma una vez que ingrese al sitio </h4></p>";

            let mailOptions = {
              from: 'Remates online',
              to: email,
              bcc: 'remate.online.ctes@gmail.com',
              subject: 'Remates online - Recuperación de Contraseña',
              html: cuerpoemail
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error){
                  res.status(400).json({
                      ok: false,
                      msg: 'Error al enviar el email electrónico'
                  });
              } else {
                  res.status(200).json({
                      ok: true,
                      msg: 'Clave reseteada y email electrónico enviado',
                  });
              }
            });
            res.status(200).json({
                ok: true,
                msg: 'Contraseña reseteada y enviada por email electrónico al usuario.'
            });
          } else {
            res.send({
              ok:false,
              msg: `No se pudo modificar el ultimoLogin del usuario id=${usuarioDb.id}. Maybe Usuario was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            ok: false,
            msg: "Error modificando el usuario id=" + usuarioDb.id
          });
        });

      }else{
        res.status(404).json({ 
          ok: false,
          msg : "El usuario no esta registrado." 
        });
      }
  }catch (error) {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg:'Error haciendo reiniciando clave, informar al administrador.'
    })
  } 
}

exports.revalidarToken = async (req, res, next) => {
  //llego acá porque valido el jwt que llego en el header de la consulta
  const {email, tipoUsuario} = req;


  return res.status(200).json({
      ok: true,
      email: email,
      tipoUsuario: tipoUsuario
  })   

}
