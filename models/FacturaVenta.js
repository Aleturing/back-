const db = require("../database/db");

const FacturaVenta = {
  getAll: (callback) => {
    const sql = "SELECT * FROM factura_venta";
    db.query(sql, (err, results) => {
      if (err || !results) return callback(err || new Error("Error en la consulta"), null);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM factura_venta WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err || !results || results.length === 0) {
        return callback(err || new Error("Factura no encontrada"), null);
      }
      callback(null, results[0]);
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
        if (err || !results) {
          console.error("❌ Error al crear factura:", err);
          return callback(err || new Error("No se pudo guardar la factura"), null);
        }
        if (!results.insertId) {
          return callback(new Error("No se obtuvo insertId al crear la factura"), null);
        }
        callback(null, results.insertId);
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
        if (err || !results) {
          return callback(err || new Error("Error al actualizar la factura"), null);
        }
        callback(null, results.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM factura_venta WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err || !results) {
        return callback(err || new Error("Error al eliminar la factura"), null);
      }
      callback(null, results.affectedRows);
    });
  }
};

module.exports = FacturaVenta;
