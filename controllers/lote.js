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