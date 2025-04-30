const db = require("../database/db");

const FacturaVenta = {
  getAll: (callback) => {
    db.all('SELECT * FROM factura_venta', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM factura_venta WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id } = data;
    const query = `
      INSERT INTO factura_venta 
      (cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id } = data;
    const query = `
      UPDATE factura_venta 
      SET cliente_id = ?, fecha = ?, total = ?, usuario_id = ?, anulada = ?, tasa = ?, detalle_factura_id = ?, devolucion_venta_id = ? 
      WHERE id = ?
    `;
    db.run(query, [cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM factura_venta WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = FacturaVenta;
