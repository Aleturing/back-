// src/models/FacturaCompra.js
const db = require('../database/db');

const FacturaCompra = {
  /** Obtener todas las facturas de compra */
  obtenerTodas(callback) {
    const sql = "SELECT * FROM factura_compra";
    db.query(sql, (err, results) => callback(err, results));
  },

  /** Obtener una factura de compra por ID */
  obtenerPorId(id, callback) {
    const sql = "SELECT * FROM factura_compra WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      const factura = Array.isArray(results) && results.length > 0 ? results[0] : null;
      callback(null, factura);
    });
  },

  /** Crear una nueva factura de compra */
  crear({ proveedor_id, total, usuario_id, tasa, detalle_factura_id }, callback) {
    const sql = `
      INSERT INTO factura_compra (proveedor_id, total, usuario_id, tasa, detalle_factura_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [proveedor_id, total, usuario_id, tasa, detalle_factura_id], (err, result) => {
      if (err) return callback(err);
      const insertId = result && typeof result.insertId === "number" ? result.insertId : null;
      callback(null, insertId);
    });
  },

  /** Actualizar una factura de compra */
  actualizar(id, { proveedor_id, total, usuario_id, tasa, detalle_factura_id }, callback) {
    const sql = `
      UPDATE factura_compra
      SET proveedor_id = ?, total = ?, usuario_id = ?, tasa = ?, detalle_factura_id = ?
      WHERE id = ?
    `;
    db.query(sql, [proveedor_id, total, usuario_id, tasa, detalle_factura_id, id], (err, result) => {
      if (err) return callback(err);
      const affectedRows = result && typeof result.affectedRows === "number" ? result.affectedRows : 0;
      callback(null, affectedRows);
    });
  },

  /** Eliminar una factura de compra */
  eliminar(id, callback) {
    const sql = "DELETE FROM factura_compra WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      const deleted = result && typeof result.affectedRows === "number" ? result.affectedRows : 0;
      callback(null, deleted);
    });
  }
};

module.exports = FacturaCompra;
