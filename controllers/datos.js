const fs = require('fs');
const csv = require('csv-parser');
const Lote = require('../models').Lote
const readline = require('readline');

exports.cargarLote = async (req, res) => {
  console.log("entra al metodo");
  Lote.sync()
    .then(() => {
      // Ruta al archivo CSV
      const archivoCSV = 'datos.csv';
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
        }).then(() => {
          console.log('Dato insertado correctamente:', line);
        }).catch((error) => {
          console.error('Error al insertar dato:', error);
        });
      });

      rl.on('close', () => {
        console.log('Proceso de carga de datos finalizado.');
        res.status(200).json({
          ok: true,
          msg: 'Proceso de carga de datos finalizado.'
        });
      });
    })
    .catch((error) => {
      console.log("error  " + error);
      console.error('Error al sincronizar el modelo con la base de datos:', error);
    })
}
   