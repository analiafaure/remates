const Lote = require('../models').Lote
const Oferta = require('../models').Oferta
const Usuario = require('../models').Usuario
var http = require('http');
const RemateLote = require('../models').RemateLote

exports.altaLote = async(req, res)=>{
   Lote.create(req.body).then(data =>{
        res.status(200).json({
            ok: true,
            msg: 'Se dio de alta un nuevo Lote',
            data: data
        })   
    }).catch(err =>{
        res.status(400).json({
            ok:false,
            msg: 'Error no se pudo registrar el Lote',
            error: err
        })
    })
}
    exports.listarLotes = async(req,res)=>{
        if (req.params.vendido == '2' ){
            Lote.findAll().then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).json({
                    error:err,
                    ok:false,
                    msg:'Error no se pudo mostrar los lotes'
                })
            })
        }
        else{
            await Lote.findAll({
                where:{ vendido: req.params.vendido}
            }).then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).json({
                    error:err,
                    ok:false,
                    msg:'Error no se pudo mostrar los Lotes'
                })
            })

        }
}

exports.modificarLote = async(req,res)=>{
    const { id }= req.params;
   await Lote.update(
    req.body,
    {
        where:{ id: id}
    }
    ).then(data =>{
        res.status(200).json({
            ok: true,
            msg: 'Lote modificado ok!',
            data: data
       })
    }).catch(err =>{
        res.status(404).json({
            error:err,
            ok:false,
            msg: 'Error al modificar el Lotes'
        })
    })
}

exports.getLotePorPartida = async(req,res)=>{
    const partida = req.params.partida
    const remate = req.params.remate
   
    if (remate != 0){
        Oferta.findAll({
            include:[{
                model:Lote,
                as:'Lote',
                where:{
                    partidaInmobiliaria:partida
                }
            }, {model:Usuario}],   
           where : { RemateId: remate},                
           order: [['valorOferta','DESC']]
        })    
       .then(async data => {
        if(data.length===0){
            const lotes = await Lote.findOne({
                where:{partidaInmobiliaria:partida}
            })
            res.send({
                ok:true,
                data:lotes
            })
        }
        else{
            res.send({
                ok:true,
                data:data
            })
        }
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se encontro el lote con dicha partida inmobiliaria'
            })
        })
    }
    else{
        Oferta.findAll({
            include:[{
                model:Lote,
                as:'Lote',
                where:{
                    partidaInmobiliaria:partida
                }
            }, {model:Usuario}],   
           order: [['valorOferta','DESC']]
        })    
       .then(async data => {
        if(data.length===0){
            const lotes = await Lote.findOne({
                where:{partidaInmobiliaria:partida}
            })
            res.send({
                ok:true,
                data:lotes
            })
        }
        else{
            res.send({
                ok:true,
                data:data
            })
        }
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se encontro el lote con dicha partida inmobiliaria'
            })
        })
    }
}
exports.asociarConRemate = async (req, res)=>{
    const data = req.body;
    let asignacion
    for (i=0; i < data.lotes.length; ++i ){
        asignacion = await RemateLote.create({
            RemateId: data.remate,
            LoteId: data.lotes[i]
        })
    }
    if (asignacion){
        res.status(200).json({
        ok:true,
        msg: 'Lotes asociados' 
        })
    }
    else{
        res.status(400).json({
        ok:false,
        msg:'Error al asignar lotes a un remate'
        })
    }
}

exports.cantidadLoteRemate = async(req,res)=>{
    const remate = req.params.remate

       await Oferta.count({
            distinct: true,
            col: 'LoteId',
            where:{ RemateId : remate}
        }).then(async data => {
            if(data != 0){
                res.send({
                    ok:true,
                    data:data,
                    msg:"Lotes con alguna oferta"
                })
            }
            else{
                await RemateLote.count({
                    distinct: true,
                    col: 'LoteId',
                    where:{ RemateId : remate}
                }).then(data => {
                    res.send({
                        ok:true,
                        data:data,
                        msg: "Lotes sin ofertas"
                    })
                }).catch(err => {
                    res.status(404).json({
                        error:err,
                         ok:false,
                        msg:'Error no se pudo mostrar la cantidad'
                    })
                })
           } 
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar la cantidad'
            })
        })
    }
    



                