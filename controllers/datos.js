const fs = require('fs');
const csv = require('csv-parser');
const Lote = require('../models').Lote
const readline = require('readline');
// Sincroniza el modelo con la base de datos (asegúrate de que la tabla exista)
exports.cargarLote = async (req,res) =>{
console.log("entra al metodo");
 Lote.sync()
  .then(() => {
    console.log("entra al then");
    // Ruta al archivo CSV
    const archivoCSV = 'datos.csv';
    console.log("constante  "+archivoCSV);
    console.log("lala");
    const rl = readline.createInterface({
        input: fs.createReadStream(archivoCSV),
        crlfDelay: Infinity, // Reconoce tanto saltos de línea '\n' como '\r\n'
      });
      
      // Escucha el evento 'line' que se dispara cuando se lee una línea
      rl.on('line', (line) => {
        const parts = line.split(',');
        Lote.create({
            partidaInmobiliaria: parts[0],
            descripcion: parts[1],
            costoInicial: parts[2],
          })
      }).then(() => {
        console.log('Datos insertados correctamente:', row);
      })
      .catch((error) => {
          console.log("error al insertar  "+ error);
        console.error('Error al insertar datos:', error);
      });
    })
    .on('end', () => {
      console.log('Proceso de carga de datos finalizado.');
      res.status(200).json({
          ok:true,
          msg:'Proceso de carga de datos finalizado.'
      })    
    })
    .catch((error) => {
      console.log("error  "+error);
      console.error('Error al sincronizar el modelo con la base de datos:', error);
    })
  //})
  }
   /* fs.access(archivoCSV, fs.constants.F_OK, (err) => {
        if (err) {
            console.log("entro en el error del archivo");
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('El archivo CSV no existe.');
        } else {
            console.log("entra en el else");
    // Lee el archivo CSV y realiza las inserciones en la base de datos
    fs.createReadStream(archivoCSV)
      .pipe(csv())
      .on('data', (row) => {
        console.log("row   "+row.partidaInmobiliaria);
        // Inserta una fila en la base de datos utilizando el modelo de Sequelize
        Lote.create({
          partidaInmobiliaria: row.partidaInmobiliaria,
          descripcion: row.descripcion,
          costoInicial: row.costoInicial,
        })
        .then(() => {
          console.log('Datos insertados correctamente:', row);
        })
        .catch((error) => {
            console.log("error al insertar  "+ error);
          console.error('Error al insertar datos:', error);
        });
      })
      .on('end', () => {
        console.log('Proceso de carga de datos finalizado.');
        res.status(200).json({
            ok:true,
            msg:'Proceso de carga de datos finalizado.'
        })    
      });
    }*/
 