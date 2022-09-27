const Usuario = require('../models').Usuario
const bcrypt  = require('bcryptjs')

exports.altaUsuario = async(req, res)=>{
    const { nombre, apellido, email, clave, tipoUsuario } = req.body
console.log(req.body)
   Usuario.create({
        nombre,
        apellido,
        email,
        clave: bcrypt.hashSync(clave, bcrypt.genSaltSync()),
        tipoUsuario,
        activo: true,
        primerLogin: true
    }).then(data =>{
        console.log(data);
        
        res.send('se genero ok')    
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