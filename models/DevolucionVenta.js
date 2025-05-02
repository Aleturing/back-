const db = require('../database/db');

const DevolucionVenta = {
  obtenerTodas(callback) {
    db.all('SELECT * FROM devolucion_venta', callback);
  },

  obtenerPorId(id, callback) {
    db.get('SELECT * FROM devolucion_venta WHERE id = ?', [id], callback);
  },

  crear({ factura_venta_id, motivo, tasa }, callback) {
    const query = 'INSERT INTO devolucion_venta (factura_venta_id, motivo, tasa) VALUES (?, ?, ?)';
    db.run(query, [factura_venta_id, motivo, tasa], function (err) {
      callback(err, this?.lastID);
    });
  },

  actualizar(id, { factura_venta_id, motivo, tasa }, callback) {
    const query = 'UPDATE devolucion_venta SET factura_venta_id = ?, motivo = ?, tasa = ? WHERE id = ?';
    db.run(query, [factura_venta_id, motivo, tasa, id], function (err) {
      callback(err, this?.changes);
    });
  },

  eliminar(id, callback) {
    db.run('DELETE FROM devolucion_venta WHERE id = ?', [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = DevolucionVenta;
