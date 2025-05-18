// src/models/DevolucionCompra.js
const db = require('../database/db');

const DevolucionCompra = {
  /** Obtener todas las devoluciones de compra */
  obtenerTodas(callback) {
    const sql = "SELECT * FROM devolucion_compra";
    db.query(sql, (err, results) => callback(err, results));
  },

  /** Obtener devolución de compra por ID */
  obtenerPorId(id, callback) {
    const sql = "SELECT * FROM devolucion_compra WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      const devolucion = Array.isArray(results) && results.length > 0 ? results[0] : null;
      callback(null, devolucion);
    });
  },

  /** Crear una nueva devolución de compra */
  crear({ factura_compra_id, motivo, tasa }, callback) {
    const sql = `
      INSERT INTO devolucion_compra (factura_compra_id, motivo, tasa)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [factura_compra_id, motivo, tasa], (err, result) => {
      if (err) return callback(err);
      const insertId = result && typeof result.insertId === "number" ? result.insertId : null;
      callback(null, insertId);
    });
  },

  /** Actualizar una devolución de compra existente */
  actualizar(id, { factura_compra_id, motivo, tasa }, callback) {
    const sql = `
      UPDATE devolucion_compra
      SET factura_compra_id = ?, motivo = ?, tasa = ?
      WHERE id = ?
    `;
    db.query(sql, [factura_compra_id, motivo, tasa, id], (err, result) => {
      if (err) return callback(err);
      const affectedRows = result && typeof result.affectedRows === "number" ? result.affectedRows : 0;
      callback(null, affectedRows);
    });
  },

  /** Eliminar una devolución de compra */
  eliminar(id, callback) {
    const sql = "DELETE FROM devolucion_compra WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      const deleted = result && typeof result.affectedRows === "number" ? result.affectedRows : 0;
      callback(null, deleted);
    });
  }
};

module.exports = DevolucionCompra;
