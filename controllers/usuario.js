const Usuario = require('../models').Usuario
const bcrypt  = require('bcryptjs')
const nodemailer = require('nodemailer')

exports.altaUsuario = async(req, res)=>{
    const { nombre, apellido, email, clave, tipoUsuario } = req.body
    Usuario.create({
        nombre,
        apellido,
        email,
        clave: bcrypt.hashSync(clave, bcrypt.genSaltSync()),
        tipoUsuario,
        activo: true,
        primerLogin: true
    }).then(data =>{
        let transporter = nodemailer.createTransport({
            service:'gmail',
			auth: {
                user:process.env.CORREO,
                pass:process.env.CLAVE
                }
            });
        
            let cuerpoCorreo = "<h1>Hola " + nombre + " </h1>"+
                                "<p>Ya podes ingresar al sistema de remates online.</p>"+
                                "<p>Usuario:  " + email + "</p>"+
                                "<p><h4>Recomendamos modificar la clave al ingresar al sistema. </h4></p>";
        
            let mailOptions = {
                from: 'Remates online',
                to: email,
                bcc: 'remate.online.ctes@gmail.com',
                subject: 'Remates online - Nuevo Usuario',
                html: cuerpoCorreo
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error){
                  res.status(400).json({
                    ok: false,
                    msg: 'Error al enviar el correo electrónico',
                    error: error
                  });
              } else {
                res.status(200).json({
                  ok: true,
                  msg: 'Usuario creado ok! Revise su correo para completar el registroooooo .',
                  data: data
                });
              }
            })
          }).catch(err =>{
            res.status(404).json({
                error:err,
                ok:false,
                msg: 'Error no se pudo registrar el usuario'
            })
    })

}

exports.listarUsuarios = async(req,res)=>{
    Usuario.findAll().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(404).json({
            error:err,
            ok:false,
            msg:'Error no se pudo mostrar los usuarios'
        })
    })
}