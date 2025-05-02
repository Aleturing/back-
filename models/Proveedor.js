const db = require("../database/db");

const Proveedor = {
  getAll: (callback) => {
    const sql = "SELECT * FROM proveedores";
    db.query(sql, (err, results) => {
      callback(err, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM proveedores WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  create: (data, callback) => {
    const { nombre, email, telefono, direccion, cedula, rif } = data;
    const sql = `
      INSERT INTO proveedores (nombre, email, telefono, direccion, cedula, rif)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [nombre, email, telefono, direccion, cedula, rif],
      (err, results) => {
        callback(err, results.insertId);
      }
    );
  },

  update: (id, data, callback) => {
    const { nombre, email, telefono, direccion, cedula, rif } = data;
    const sql = `
      UPDATE proveedores
      SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ?
      WHERE id = ?
    `;
    db.query(
      sql,
      [nombre, email, telefono, direccion, cedula, rif, id],
      (err, results) => {
        callback(err, results.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM proveedores WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results.affectedRows);
    });
  }
};

module.exports = Proveedor;
