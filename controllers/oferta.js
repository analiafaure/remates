const Oferta = require('../models').Oferta
const Lote = require('../models').Lote
const Remate = require('../models').Remate
const Usuario = require('../models').Usuario
const Sequelize = require('sequelize');

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
         //console.log(JSON.stringify(await Oferta.findAll({include:[{model:Lote,required: true},{model: Remate,required:true}, Usuario],where: {UsuarioId : cliente }})));
         Oferta.findAll({
            where: { UsuarioId : cliente },
            order: [['createdAt','DESC']],
            include:
            [{model:Lote},
            {model: Remate}, 
            Usuario]})
            .then(data => {
                 res.send(data)
             }).catch(err => {
                 res.status(404).json({
                     error:err,
                     ok:false,
                     msg:'Error no se pudo listar las ofertas'
                 })
             })
  }

  exports.ofertaMax = async(req,res)=>{
    const lote = req.params.lote
    const remate = req.params.remate
    
    await Oferta.findAll({
                attributes:[[Sequelize.fn('max', Sequelize.col('valorOferta')),'max']],
                where: { 
                   LoteId : lote ,
                   RemateId: remate
                }
           }) 
    .then(data => {
        console.log(data)
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo listar las ofertas'
            })
        })
}