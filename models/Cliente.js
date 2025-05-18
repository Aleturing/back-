// src/models/Cliente.js
const db = require("../database/db");

const Cliente = {
  /** Obtener todos los clientes */
  obtenerTodos(callback) {
    const sql = "SELECT * FROM clientes";
    db.query(sql, (err, results) => callback(err, results));
  },

  /** Obtener cliente por ID */
  obtenerPorId(id, callback) {
    const sql = "SELECT * FROM clientes WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      const cliente = Array.isArray(results) && results.length > 0 ? results[0] : null;
      callback(null, cliente);
    });
  },

  /** Crear nuevo cliente */
  crear({ nombre, email, telefono, direccion, cedula, rif }, callback) {
    const sql = `
      INSERT INTO clientes (nombre, email, telefono, direccion, cedula, rif)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [nombre, email, telefono, direccion, cedula, rif], (err, result) => {
      if (err) return callback(err);
      const insertId = result && typeof result.insertId === "number" ? result.insertId : null;
      callback(null, insertId);
    });
  },

  /** Actualizar cliente existente */
  actualizar(id, { nombre, email, telefono, direccion, cedula, rif }, callback) {
    const sql = `
      UPDATE clientes
      SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ?
      WHERE id = ?
    `;
    db.query(sql, [nombre, email, telefono, direccion, cedula, rif, id], (err, result) => {
      if (err) return callback(err);
      const affectedRows = result && typeof result.affectedRows === "number" ? result.affectedRows : 0;
      callback(null, affectedRows);
    });
  },

  /** Eliminar cliente */
  eliminar(id, callback) {
    const sql = "DELETE FROM clientes WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      const deleted = result && typeof result.affectedRows === "number" ? result.affectedRows : 0;
      callback(null, deleted);
    });
  },
};

module.exports = Cliente;
