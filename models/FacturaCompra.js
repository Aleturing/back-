const db = require('../database/db');

const FacturaCompra = {
  obtenerTodas(callback) {
    db.all('SELECT * FROM factura_compra', callback);
  },

  obtenerPorId(id, callback) {
    db.get('SELECT * FROM factura_compra WHERE id = ?', [id], callback);
  },

  crear({ proveedor_id, total, usuario_id, tasa, detalle_factura_id }, callback) {
    const query = 'INSERT INTO factura_compra (proveedor_id, total, usuario_id, tasa, detalle_factura_id) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [proveedor_id, total, usuario_id, tasa, detalle_factura_id], function (err) {
      callback(err, this?.lastID);
    });
  },

  actualizar(id, { proveedor_id, total, usuario_id, tasa, detalle_factura_id }, callback) {
    const query = 'UPDATE factura_compra SET proveedor_id = ?, total = ?, usuario_id = ?, tasa = ?, detalle_factura_id = ? WHERE id = ?';
    db.run(query, [proveedor_id, total, usuario_id, tasa, detalle_factura_id, id], function (err) {
      callback(err, this?.changes);
    });
  },

  eliminar(id, callback) {
    db.run('DELETE FROM factura_compra WHERE id = ?', [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = FacturaCompra;
