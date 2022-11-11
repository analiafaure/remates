const Oferta = require('../models').Oferta

exports.altaOferta = async(req, res)=>{
    Oferta.create(req.body).then(data =>{
         res.status(200).json({
             ok: true,
             msg: 'Se genero la oferta',
             data: data
         })   
     }).catch(err =>{
         res.status(400).json({
             ok:false,
             msg: 'Error no se pudo generar la Oferta',
             error: err
         })
     })
 }
     exports.listarOfertasCliente = async(req,res)=>{
         const cliente = req.params.cliente 
             Oferta.findAll({
                where: {idUsuario : cliente }
             }).then(data => {
                 res.send(data)
             }).catch(err => {
                 res.status(404).json({
                     error:err,
                     ok:false,
                     msg:'Error no se pudo listar las ofertas'
                 })
             })
    }