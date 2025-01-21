const db = require('../db');

const DetalleDevolucion = {
  getAll: (callback) => {
    db.all('SELECT * FROM detalle_devolucion', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM detalle_devolucion WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo } = data;
    const query = `
      INSERT INTO detalle_devolucion 
      (devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo } = data;
    const query = `
      UPDATE detalle_devolucion 
      SET devolucion_compra_id = ?, devolucion_venta_id = ?, producto_id = ?, cantidad = ?, motivo = ? 
      WHERE id = ?
    `;
    db.run(query, [devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM detalle_devolucion WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = DetalleDevolucion;
