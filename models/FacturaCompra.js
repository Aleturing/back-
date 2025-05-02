const db = require("../database/db");

const FacturaCompra = {
  getAll: (callback) => {
    const sql = "SELECT * FROM factura_compra";
    db.query(sql, (err, results) => {
      callback(err, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM factura_compra WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  create: (data, callback) => {
    const { proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id } = data;
    const sql = `
      INSERT INTO factura_compra 
      (proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id],
      (err, results) => {
        callback(err, results.insertId);
      }
    );
  },

  update: (id, data, callback) => {
    const { proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id } = data;
    const sql = `
      UPDATE factura_compra 
      SET proveedor_id = ?, fecha = ?, total = ?, usuario_id = ?, anulada = ?, tasa = ?, detalle_factura_id = ? 
      WHERE id = ?
    `;
    db.query(
      sql,
      [proveedor_id, fecha, total, usuario_id, anulada, tasa, detalle_factura_id, id],
      (err, results) => {
        callback(err, results.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM factura_compra WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results.affectedRows);
    });
  }
};

module.exports = FacturaCompra;