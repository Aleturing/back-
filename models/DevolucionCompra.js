const db = require("../database/db");

const DevolucionCompra = {
  getAll: (callback) => {
    db.all('SELECT * FROM devolucion_compra', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM devolucion_compra WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { factura_compra_id, fecha, motivo, tasa, anulada, detalle_devolucion_id } = data;
    const query = `
      INSERT INTO devolucion_compra 
      (factura_compra_id, fecha, motivo, tasa, anulada, detalle_devolucion_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [factura_compra_id, fecha, motivo, tasa, anulada, detalle_devolucion_id], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { factura_compra_id, fecha, motivo, tasa, anulada, detalle_devolucion_id } = data;
    const query = `
      UPDATE devolucion_compra 
      SET factura_compra_id = ?, fecha = ?, motivo = ?, tasa = ?, anulada = ?, detalle_devolucion_id = ? 
      WHERE id = ?
    `;
    db.run(query, [factura_compra_id, fecha, motivo, tasa, anulada, detalle_devolucion_id, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM devolucion_compra WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = DevolucionCompra;
