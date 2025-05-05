// src/models/Producto.js
const db = require("../database/db");

/**
 * Modelo Producto para operaciones CRUD sobre la tabla `productos`.
 * Maneja manualmente la eliminación de registros dependientes en detalle_factura y detalle_devolucion.
 */
const Producto = {
  /** Obtener todos los productos */
  getAll(callback) {
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, results) => callback(err, results));
  },

  /** Obtener un producto por su ID */
  getById(id, callback) {
    const sql = "SELECT * FROM productos WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      const producto = Array.isArray(results) && results.length > 0 ? results[0] : null;
      callback(null, producto);
    });
  },

  /** Crear un nuevo producto */
  create(data, callback) {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      INSERT INTO productos (nombre, descripcion, precio, stock, foto)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [nombre, descripcion, precio, stock, foto], (err, results) => {
      if (err) return callback(err);
      const insertId = results && typeof results.insertId === "number" ? results.insertId : null;
      callback(null, insertId);
    });
  },

  /** Actualizar un producto existente */
  update(id, data, callback) {
    const { nombre, descripcion, precio, stock, foto } = data;
    const sql = `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ?
      WHERE id = ?
    `;
    db.query(sql, [nombre, descripcion, precio, stock, foto, id], (err, results) => {
      if (err) return callback(err);
      const affected = results && typeof results.affectedRows === "number" ? results.affectedRows : 0;
      callback(null, affected);
    });
  },

  /** Eliminar un producto y sus dependientes */
  delete(id, callback) {
    // 1) Borrar registros en detalle_factura
    const sqlDetalleFactura = "DELETE FROM detalle_factura WHERE producto_id = ?";
    db.query(sqlDetalleFactura, [id], (err) => {
      if (err) return callback(err);

      // 2) Borrar registros en detalle_devolucion
      const sqlDetalleDevolucion = "DELETE FROM detalle_devolucion WHERE producto_id = ?";
      db.query(sqlDetalleDevolucion, [id], (err) => {
        if (err) return callback(err);

        // 3) Finalmente, borrar el producto
        const sqlProducto = "DELETE FROM productos WHERE id = ?";
        db.query(sqlProducto, [id], (err, results) => {
          if (err) return callback(err);
          const deleted = results && typeof results.affectedRows === "number" ? results.affectedRows : 0;
          callback(null, deleted);
        });
      });
    });
  }
};

module.exports = Producto;
