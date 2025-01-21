const db = require('../db');

const FacturaCompra = {
  getAll: (callback) => {
    db.all('SELECT * FROM factura_compra', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM factura_compra WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id } = data;
    const query = `
      INSERT INTO factura_compra 
      (proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id } = data;
    const query = `
      UPDATE factura_compra 
      SET proveedor_id = ?, fecha = ?, total = ?, usuario_id = ?, anulada = ?, tasa = ?, detalle_factura_id = ? 
      WHERE id = ?
    `;
    db.run(query, [proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM factura_compra WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = FacturaCompra;
