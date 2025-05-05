// models/Producto.js
const db = require("../database/db");

const Producto = {
  // ... otros métodos ...

  delete: (id, callback) => {
    // Eliminar registros en detalle_factura
    const sqlDetalleFactura = "DELETE FROM detalle_factura WHERE producto_id = ?";
    db.query(sqlDetalleFactura, [id], (err) => {
      if (err) return callback(err);

      // Eliminar registros en detalle_devolucion
      const sqlDetalleDevolucion = "DELETE FROM detalle_devolucion WHERE producto_id = ?";
      db.query(sqlDetalleDevolucion, [id], (err) => {
        if (err) return callback(err);

        // Finalmente, eliminar el producto
        const sqlProducto = "DELETE FROM productos WHERE id = ?";
        db.query(sqlProducto, [id], (err, results) => {
          if (err) return callback(err);
          const deleted = results && typeof results.affectedRows === "number"
            ? results.affectedRows
            : 0;
          callback(null, deleted);
        });
      });
    });
  }
};

module.exports = Producto;
