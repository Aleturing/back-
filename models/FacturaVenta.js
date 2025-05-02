const db = require("../database/db");

const FacturaVenta = {
  getAll: (callback) => {
    const sql = "SELECT * FROM factura_venta";
    db.query(sql, (err, results) => {
      callback(err, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM factura_venta WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  create: (data, callback) => {
    const { cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id } = data;
    const sql = `
      INSERT INTO factura_venta 
      (cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id],
      (err, results) => {
        callback(err, results.insertId);
      }
    );
  },

  update: (id, data, callback) => {
    const { cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id } = data;
    const sql = `
      UPDATE factura_venta 
      SET cliente_id = ?, fecha = ?, total = ?, usuario_id = ?, anulada = ?, tasa = ?, detalle_factura_id = ?, devolucion_venta_id = ? 
      WHERE id = ?
    `;
    db.query(
      sql,
      [cliente_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, devolucion_venta_id, id],
      (err, results) => {
        callback(err, results.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM factura_venta WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results.affectedRows);
    });
  }
};

module.exports = FacturaVenta;
