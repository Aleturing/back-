// models/Producto.js
const db = require("../database/db");

/**
 * Modelo Producto para operaciones CRUD sobre la tabla `productos`.
 */
const Producto = {
  /**
   * Obtener todos los productos.
   */
  getAll: (callback) => {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, results) => {
      // results es un array de filas
      callback(err, results);
    });
  },

  /**
   * Obtener un producto por su ID.
   */
  getById: (id, callback) => {
    const sql = "SELECT * FROM productos WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      // results[0] o null si no existe
      const producto = Array.isArray(results) && results.length > 0 ? results[0] : null;
      callback(null, producto);
    });
  },

  /**
   * Crear un nuevo producto.
   */
  create: (data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      INSERT INTO productos (nombre, descripcion, precio, stock, foto)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [nombre, descripcion, precio, stock, foto], (err, results) => {
      if (err) return callback(err);
      // results.insertId contiene el ID del nuevo registro
      const insertId = results && typeof results.insertId === 'number' ? results.insertId : null;
      callback(null, insertId);
    });
  },

  /**
   * Actualizar un producto existente.
   */
  update: (id, data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ?
      WHERE id = ?
    `;
    db.query(sql, [nombre, descripcion, precio, stock, foto, id], (err, results) => {
      if (err) return callback(err);
      // results.affectedRows indica cuántas filas fueron modificadas
      const affected = results && typeof results.affectedRows === 'number' ? results.affectedRows : 0;
      callback(null, affected);
    });
  },

  /**
   * Eliminar un producto por su ID.
   */
  delete: (id, callback) => {
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      // results.affectedRows indica cuántas filas fueron eliminadas
      const deleted = results && typeof results.affectedRows === 'number' ? results.affectedRows : 0;
      callback(null, deleted);
    });
  }
};

module.exports = Producto;
