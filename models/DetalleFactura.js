const db = require('../database/db');

const DetalleFactura = {
  obtenerTodos(callback) {
    db.all('SELECT * FROM detalle_factura', callback);
  },

  obtenerPorId(id, callback) {
    db.get('SELECT * FROM detalle_factura WHERE id = ?', [id], callback);
  },

  crear({ factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario }, callback) {
    const checkStock = 'SELECT stock FROM productos WHERE id = ?';
    db.get(checkStock, [producto_id], (err, row) => {
      if (err) return callback(err);
      if (!row) return callback(new Error('Producto no encontrado'));
      if (row.stock < cantidad) return callback(new Error('No hay suficiente stock disponible'));

      const updateStock = 'UPDATE productos SET stock = stock - ? WHERE id = ?';
      db.run(updateStock, [cantidad, producto_id], function (err) {
        if (err) return callback(err);

        const insert = `
          INSERT INTO detalle_factura 
          (factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario)
          VALUES (?, ?, ?, ?, ?)
        `;
        db.run(insert, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario], function (err) {
          callback(err, this?.lastID);
        });
      });
    });
  },

  actualizar(id, { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario }, callback) {
    const query = `
      UPDATE detalle_factura 
      SET factura_compra_id = ?, factura_venta_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ?
      WHERE id = ?
    `;
    db.run(query, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario, id], callback);
  },

  eliminar(id, callback) {
    const query = 'DELETE FROM detalle_factura WHERE id = ?';
    db.run(query, [id], callback);
  }
};

module.exports = DetalleFactura;
