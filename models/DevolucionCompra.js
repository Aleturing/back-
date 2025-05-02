const db = require('../database/db');

const DevolucionCompra = {
  obtenerTodas(callback) {
    db.all('SELECT * FROM devolucion_compra', callback);
  },

  obtenerPorId(id, callback) {
    db.get('SELECT * FROM devolucion_compra WHERE id = ?', [id], callback);
  },

  crear({ factura_compra_id, motivo, tasa }, callback) {
    const query = 'INSERT INTO devolucion_compra (factura_compra_id, motivo, tasa) VALUES (?, ?, ?)';
    db.run(query, [factura_compra_id, motivo, tasa], function (err) {
      callback(err, this?.lastID);
    });
  },

  actualizar(id, { factura_compra_id, motivo, tasa }, callback) {
    const query = 'UPDATE devolucion_compra SET factura_compra_id = ?, motivo = ?, tasa = ? WHERE id = ?';
    db.run(query, [factura_compra_id, motivo, tasa, id], function (err) {
      callback(err, this?.changes);
    });
  },

  eliminar(id, callback) {
    db.run('DELETE FROM devolucion_compra WHERE id = ?', [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = DevolucionCompra;
