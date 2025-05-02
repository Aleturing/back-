const db = require('../database/db');

const DetalleFactura = {
  obtenerTodos: (callback) => {
    const sql = 'SELECT * FROM detalle_factura';
    db.query(sql, (err, results) => callback(err, results));
  },

  obtenerPorId: (id, callback) => {
    const sql = 'SELECT * FROM detalle_factura WHERE id = ?';
    db.query(sql, [id], (err, results) => callback(err, results[0]));
  },

  crear: (detalle, callback) => {
    const { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario } = detalle;

    db.beginTransaction((err) => {
      if (err) return callback(err);

      const sqlStock = 'SELECT stock FROM productos WHERE id = ?';
      db.query(sqlStock, [producto_id], (err, results) => {
        if (err) return rollback(err);
        const producto = results[0];
        if (!producto) return rollback(new Error('Producto no encontrado'));
        if (producto.stock < cantidad) return rollback(new Error('No hay suficiente stock disponible'));

        const sqlUpdateStock = 'UPDATE productos SET stock = stock - ? WHERE id = ?';
        db.query(sqlUpdateStock, [cantidad, producto_id], (err) => {
          if (err) return rollback(err);

          const sqlInsert = `
            INSERT INTO detalle_factura 
            (factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario)
            VALUES (?, ?, ?, ?, ?)
          `;
          db.query(
            sqlInsert,
            [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario],
            (err, result) => {
              if (err) return rollback(err);
              db.commit((err) => {
                if (err) return rollback(err);
                callback(null, result.insertId);
              });
            }
          );
        });
      });

      function rollback(error) {
        db.rollback(() => callback(error));
      }
    });
  },

  actualizar: (id, detalle, callback) => {
    const { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario } = detalle;
    const sql = `
      UPDATE detalle_factura 
      SET factura_compra_id = ?, factura_venta_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ?
      WHERE id = ?
    `;
    db.query(
      sql,
      [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario, id],
      (err, result) => callback(err, result)
    );
  },

  eliminar: (id, callback) => {
    const sql = 'DELETE FROM detalle_factura WHERE id = ?';
    db.query(sql, [id], (err, result) => callback(err, result));
  }
};

module.exports = DetalleFactura;
