const Remate = require('../models').Remate

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
