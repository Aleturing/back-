const db = require("../database/db");

const DevolucionVenta = {
  getAll: (callback) => {
    db.all('SELECT * FROM devolucion_venta', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM devolucion_venta WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { factura_venta_id, fecha, motivo, tasa, anulada, detalle_devolucion_id } = data;
    const query = `
      INSERT INTO devolucion_venta 
      (factura_venta_id, fecha, motivo, tasa, anulada, detalle_devolucion_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [factura_venta_id, fecha, motivo, tasa, anulada, detalle_devolucion_id], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { factura_venta_id, fecha, motivo, tasa, anulada, detalle_devolucion_id } = data;
    const query = `
      UPDATE devolucion_venta 
      SET factura_venta_id = ?, fecha = ?, motivo = ?, tasa = ?, anulada = ?, detalle_devolucion_id = ? 
      WHERE id = ?
    `;
    db.run(query, [factura_venta_id, fecha, motivo, tasa, anulada, detalle_devolucion_id, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM devolucion_venta WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = DevolucionVenta;
