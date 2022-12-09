const Oferta = require('../models').Oferta
const Lote = require('../models').Lote
const Remate = require('../models').Remate
const Usuario = require('../models').Usuario
const nodemailer = require('nodemailer')

exports.altaOferta = async (req,res)=>{
    const usuario = req.body.UsuarioId
    const lote = req.body.LoteId
    const remate = req.body.RemateId

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:process.env.CORREO,
            pass:process.env.CLAVE
            }
        });
    
    Oferta.findAll({
        where: { LoteId : lote, RemateId: remate },
        order: [['valorOferta','DESC']],
        limit: [1],
        include:
            [ {model:Usuario}]
                }) 
    .then(data => {
        let cuerpoCorreo = `<h1>Hola  ${data[0].Usuario.nombre}  </h1>
        <p>Han superado tu ultima oferta</p>
        <p>En el lote ${data[0].Usuario.email} </p>`; 
        
        let mailOptions = {
            from: 'Chacras de San Cayetano',
            to: data[0].Usuario.email,
            subject: 'Chacras de San Cayetano - Notificacion',
            html: cuerpoCorreo
        };
         if(usuario != data[0].UsuarioId){
            console.log("entra")
                transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                       console.log("no se envio el correo")
                    } 
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
                          
             })
            }
        }).catch(err =>{
            res.status(400).json({
                ok:false,
                msg: 'Error no se obtubo el maximo',
                error: err
            })
        })
    }
     exports.listarOfertasCliente = async(req,res)=>{
         const cliente = req.params.cliente
         let dataMax = [];
         //console.log(JSON.stringify(await Oferta.findAll({include:[{model:Lote,required: true},{model: Remate,required:true}, Usuario],where: {UsuarioId : cliente }})));
         Oferta.findAll({
            where: { UsuarioId : cliente },
            order: [['createdAt','DESC']],
            include:
            [{model:Lote},
            {model: Remate}, 
            Usuario]})
            .then(async data => {
                for (i=0; i < data.length; ++i ){
//refactorizar      
                    const max = await Oferta.findAll({
                    where: { LoteId : data[i].LoteId, RemateId: data[i].RemateId },
                    order: [['valorOferta','DESC']],
                    limit: [1],
                    include:
                        [ {model:Usuario}]
                            })
                let x = {
                    "lista": data[i],
                    "ganador": max[0].valorOferta ===  data[i].valorOferta ? true : false
                    }                               
                dataMax.push(x)
                }  
                if (dataMax){
                    res.send(dataMax)
                }
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
        where: { LoteId : lote, RemateId: remate },
        order: [['valorOferta','DESC']],
        limit: [1],
        include:
            [ {model:Usuario}]
                }) 
    .then(data => {
        res.status(200).json({
            ok: true,
            msg: 'oferta max',
            data: data
        })   
         // res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo listar las ofertas'
            })
        })
}

exports.ganadoresRemate = async(req,res)=>{
    const remate = req.params.remate
    await Oferta.findAll({
                where: { 
                   RemateId: remate
                },
                include:
                    [{model:Lote},
                    {model:Usuario}]
                }) 
    .then(async data => {
        const lotes = [];
        const ganadores = [];
        data.forEach(e => {
            if (lotes.indexOf(e.LoteId) === -1) {
                lotes.push(e.LoteId);
            }
        });
        for (i=0; i < lotes.length; ++i ){
            let ganador = await Oferta.findAll({
                where: { LoteId : lotes[i], RemateId: remate },
                order: [['valorOferta','DESC']],
                limit: [1],
                include:
                    [{model:Lote},
                    {model:Usuario}]
                
            })
            ganadores.push(ganador)
        }
        if (ganadores){
            res.send(ganadores)
        }
        
    }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo listar los ganadores'
            })
        })
}

