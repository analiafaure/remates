const Remate = require('../models').Remate
const moment = require('moment')
const date = new Date()
const dateFormat =moment(date,"YYYY/MM/DD HH:mm")
    
exports.altaRemate = async(req, res)=>{
    const { descripcion, fechaInicio, fechaFin, costoPuja, incrementoPuja,topePuja } = req.body
    
console.log(req.body)
   Remate.create({
        descripcion,
        fechaInicio,
        fechaFin,
        costoPuja,
        incrementoPuja,
        topePuja,
        activo: true
    }).then(data =>{
        console.log(data);
        
        res.send('se genero ok')    
    }).catch(err =>{
        res.status(400).json({
            ok:false,
            msg: 'Error no se pudo registrar el Remate'
        })
    })
}

exports.listarRemates = async(req,res)=>{
        Remate.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los remates'
            })
        })
}

exports.remateVigente = async(req,res)=>{
    let rematesVigentes=[]
    
    Remate.findAll({
        where: Remate.activo = true
    }).then(data => {
        data.forEach(element => {
            if (element.fechaInicio < dateFormat && element.fechaFin > dateFormat){
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
    
    Remate.findAll({
        where: Remate.activo = true
    }).then(data => {
        data.forEach(element => {
            if (element.fechaInicio > dateFormat){
                res.send(element)      
            }
        })
    }).catch(err => {
        res.status(404).json({
            error:err,
            ok:false,
            msg:'Error no se pudo mostrar los remates'
        })
    })
}


