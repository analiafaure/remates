const Usuario = require('../models').Usuario
const bcrypt  = require('bcryptjs')
const nodemailer = require('nodemailer')
const helpers = require('../config/helpers')

exports.altaUsuario = async(req, res)=>{
    let { nombre, apellido, email, clave, tipoUsuario, dni } = req.body
    let cuerpoCorreo = `<h1>Hola  ${nombre}  </h1>
    <p>Ya podes ingresar a Chacras de San Cayetano.</p>
    <p>Tu usuario es ${email} </p>
    <p>Ingresa haciendo click en el enlace:  ${process.env.DOMINIO}/#/auth/login</p>`;


    if(!clave){
        clave = dni
        cuerpoCorreo = `<h1>Hola ${nombre}  </h1>
        <p>Ya podes ingresar a Chacras de San Cayetano.</p>
        <p>Tu usuario es ${email} </p>
        <p>Tu clave es ${dni}. Recomendamos modificar su clave </p>
        <p>Ingresa haciendo click en el enlace:  ${process.env.DOMINIO}/#/auth/login</p>`;
    }
    Usuario.create({
        nombre,
        apellido,
        email,
        dni,
        clave: bcrypt.hashSync(clave, bcrypt.genSaltSync()),
        tipoUsuario,
        activo: true,
        primerLogin: true,
        reinicioClave: false
    }).then(data =>{
        let transporter = nodemailer.createTransport({
            service:'gmail',
			auth: {
                user:process.env.CORREO,
                pass:process.env.CLAVE
                }
            });
        
            let mailOptions = {
                from: 'Remates online',
                to: email,
                bcc: [process.env.CORREO_OPERADOR1, process.env.CORREO_OPERADOR2],
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
                  msg: 'Usuario creado ok! Revise su correo para completar el registro.',
                  data: data
                });
              }
            })
          }).catch(err =>{
            if(err.name === "SequelizeUniqueConstraintError"){
                res.status(404).json({
                    error:err,
                    ok:false,
                    msg: 'El correo electronico ya ha sido registrado'
                })
            }
           else{
            res.status(404).json({
                error:err,
                ok:false,
                msg: 'Error al registrar el usuario'
            })
           }
    })

}

exports.listarUsuarios = async(req,res)=>{
     if (req.params.activo == '2' ){
        await Usuario.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los usuarios'
            })
        })
    }
    else{
        await Usuario.findAll({
            where:{ activo: req.params.activo}
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los usuarios'
            })
        })
    }
    
}

exports.modificarUsuario = async(req,res)=>{
    const { id }= req.params;
    if (req.body.clave && req.body.claveActual){
        let user = await Usuario.findOne({
            where: { id: id }
        })
        let validPass = await helpers.marchPassword(req.body.claveActual, user.clave);
        if (validPass){
            req.body.clave = bcrypt.hashSync(req.body.clave, bcrypt.genSaltSync())
        }
        else{
            res.status(404).json({
                error:err,
                ok:false,
                msg:'La clave ingresada no corresponde a ese usuario'
            })
        }
    }
   await Usuario.update(
    req.body,
    {
        where:{ id: id}
    }
   ).then(data =>{
        res.status(200).json({
            ok: true,
            msg: 'Usuario modificado ok!',
            data: data
       })
    }).catch(err =>{
        if(err.name === "SequelizeUniqueConstraintError"){
            res.status(404).json({
                error:err,
                ok:false,
                msg: 'Error- el dni o correo electronico ya han sido registrados'
            })
        }
       else{
        res.status(404).json({
            error:err,
            ok:false,
            msg: 'Error al modificar el usuario'
        })
    }
    })
}

exports.getUsuarioId = async(req,res)=>{
    const id = req.params.id

    await Usuario.findOne({
        where: { id: id }
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(404).json({
            error:err,
            ok:false,
            msg:'Error no se encontro el usuario'
        })
    })
}

exports.eliminarUsuario = async(req,res)=>{
    const id = req.params.id
    await Usuario.destroy({
        where: {id: id}
    }).then(data => {
        if(data === 1){
            res.send({
                data: data,
                ok:true,
                msg: 'El usuario ha sido eliminado'
            })
        }
        else{
            res.send({
                data: data,
                ok:true,
                msg: 'El usuario no existe'
            })
        }
        
    }).catch(err => {
        res.status(404).json({
        error: err,
        ok: false,
        msg: 'No se pudo eliminar el usuario'
        })
    })
}

exports.listarUsuariosTipo = async(req,res)=>{
    const tipo = req.params.tipo
    console.log(tipo)
    await Usuario.findAll({
           where:{ tipoUsuario: tipo}
       }).then(data => {
            if(data.length===0){
                res.send({
                    ok:false,
                    msg:"No hay usuarios de ese tipo"
                })
            }
            else{
                res.send({
                    ok:true,
                    data: data
                })
            }
           
       }).catch(err => {
           res.status(404).json({
               error:err,
               ok:false,
               msg:'Error no se pudo mostrar los usuarios'
           })
       })
}

