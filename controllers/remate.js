const Remate = require('../models').Remate
const moment = require('moment')
const RemateLote = require('../models').RemateLote
const Lote = require('../models').Lote
const date = new Date()
const dateFormat =moment(date,"YYYY/MM/DD HH:mm")
    
exports.altaRemate = async(req, res)=>{
    const { descripcion, fechaInicio, fechaFin, costoPuja, incrementoPuja,topePuja } = req.body
    Remate.create({
        descripcion,
        fechaInicio,
        fechaFin,
        costoPuja,
        incrementoPuja,
        topePuja,
        activo: true
    }).then(data =>{
        res.status(200).json({
            data:data,
            ok:true,
            msg:'Se dio de alta un nuevo remate'
        })    
    }).catch(err =>{
        res.status(400).json({
            ok:false,
            msg: 'Error no se pudo registrar el Remate',
            error: err
        })
    })
}

exports.listarRemates = async(req,res)=>{
    if (req.params.activo == '2' ){
        Remate.findAll({
            order: [['fechaInicio','ASC']] 
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los remates'
            })
        })
    }
    else{
        await Remate.findAll({
            where:{ activo: req.params.activo},
            order: [['fechaInicio','ASC']] 
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los remates'
            })
        })
    }
}

exports.remateVigente = async(req,res)=>{
    let rematesVigentes=[]
    
    Remate.findAll({
        where: { activo : true } 
    }).then(data => {
        data.forEach(element => {
            if (moment(element.fechaInicio,"YYYY/MM/DD HH:mm").isBefore(dateFormat) && moment(element.fechaFin,"YYYY/MM/DD HH:mm").isAfter(dateFormat) ){
                rematesVigentes.push(element)
            }
        })
        res.send(rematesVigentes)
    }).catch(err => {
        res.status(404).json({
            error:err,
            ok:false,
            msg:'Error no se pudo mostrar los remates'
        })
    })
}

exports.remateProximo = async (req, res) =>{
    Remate.findOne({
        where: { activo : true } ,
        order: [['fechaInicio','ASC']] 
    }).then(data => {
        res.send( data)        
    }).catch(err => {
        res.status(404).json({
            error:err,
            ok:false,
            msg:'Error no se pudo mostrar los remates'
        })
    })
}

exports.modificarRemate = async(req,res)=>{
    const { id }= req.params;
   await Remate.update(
    req.body,
    {
        where:{ id: id}
    }
    ).then(data =>{
        res.status(200).json({
            ok: true,
            msg: 'Remate modificado ok!',
            data: data
       })
    }).catch(err =>{
        res.status(404).json({
            error:err,
            ok:false,
            msg: 'Error al modificar el remates'
        })
    })
}

exports.lotesAsociadosRemate = async(req,res)=>{
    const remateId = req.params.remate
        RemateLote.findAll({
            where :{ RemateId : remateId},
            order : [['LoteId','ASC']],
            include:
            [{model:Lote}] 
        }).then(data => {
            if(data.length===0){
               res.send({
                    ok:false,
                    msg:"Sin lotes asociados"
                })
            }
            else{
                res.send({
                    ok:true,
                    data:data
                })
            }
            //res.send(data)
        }).catch(err => {
            console.log(err)
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los lotes asociados'
            })
        })
}