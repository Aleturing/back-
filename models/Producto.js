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
      if (err) return callback(err);
      callback(null, results && results[0] ? results[0] : null);
    });
  },

  create: (data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      INSERT INTO productos (nombre, descripcion, precio, stock, foto)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [nombre, descripcion, precio, stock, foto], (err, results) => {
      if (err) return callback(err);
      // results.insertId contiene el ID generado
      const insertId = results && results.insertId ? results.insertId : null;
      callback(null, insertId);
    });
  },

  update: (id, data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ?
      WHERE id = ?
    `;
    db.query(sql, [nombre, descripcion, precio, stock, foto, id], (err, results) => {
      if (err) return callback(err);
      // results.affectedRows indica cuántas filas fueron actualizadas
      const affected = results && typeof results.affectedRows === 'number' ? results.affectedRows : 0;
      callback(null, affected);
    });
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      // Manejar caso en que results sea undefined
      const rowsDeleted = results && typeof results.affectedRows === 'number' ? results.affectedRows : 0;
      callback(null, rowsDeleted);
    });
  }
};

module.exports = Producto;
