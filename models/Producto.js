const db = require("../database/db");

const Producto = {
  getAll: (callback) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, results) => {
      callback(err, results);
    });
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM productos WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  create: (data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      INSERT INTO productos (nombre, descripcion, precio, stock, foto)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [nombre, descripcion, precio, stock, foto],
      (err, results) => {
        callback(err, results.insertId);
      }
    );
  },

  update: (id, data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ?
      WHERE id = ?
    `;
    db.query(
      sql,
      [nombre, descripcion, precio, stock, foto, id],
      (err, results) => {
        callback(err, results.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results.affectedRows);
    });
  }
};

module.exports = Producto;