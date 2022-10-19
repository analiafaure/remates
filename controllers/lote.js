const Lote = require('../models').Lote

exports.altaLote = async(req, res)=>{
    
console.log(req.body)
   Lote.create(req.body).then(data =>{
        console.log(data);
        
        res.send('se genero ok')    
    }).catch(err =>{
        res.status(400).json({
            ok:false,
            msg: 'Error no se pudo registrar el Lote'
        })
    })
}
    exports.listarLotes = async(req,res)=>{
        Lote.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                error:err,
                ok:false,
                msg:'Error no se pudo mostrar los remates'
            })
        })
}
