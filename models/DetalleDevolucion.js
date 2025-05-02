const db = require("../database/db");

const DetalleDevolucion = {
  getAll: (callback) => {
    const sql = "SELECT * FROM detalle_devolucion";
    db.query(sql, (err, results) => {
      callback(err, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM detalle_devolucion WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  create: (data, callback) => {
    const { devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo } = data;
    const sql = `
      INSERT INTO detalle_devolucion 
      (devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo],
      (err, results) => {
        callback(err, results.insertId);
      }
    );
  },

  update: (id, data, callback) => {
    const { devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo } = data;
    const sql = `
      UPDATE detalle_devolucion
      SET devolucion_compra_id = ?, devolucion_venta_id = ?, producto_id = ?, cantidad = ?, motivo = ?
      WHERE id = ?
    `;
    db.query(
      sql,
      [devolucion_compra_id, devolucion_venta_id, producto_id, cantidad, motivo, id],
      (err, results) => {
        callback(err, results.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM detalle_devolucion WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results.affectedRows);
    });
  }
};

module.exports = DetalleDevolucion;
