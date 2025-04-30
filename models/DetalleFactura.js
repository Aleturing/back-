const db = require("../database/db");

const DetalleFactura = {
  getAll: (callback) => {
    db.all('SELECT * FROM detalle_factura', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM detalle_factura WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario } = data;
    const query = `
      INSERT INTO detalle_factura (factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario } = data;
    const query = `
      UPDATE detalle_factura 
      SET factura_compra_id = ?, factura_venta_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ? 
      WHERE id = ?
    `;
    db.run(query, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM detalle_factura WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = DetalleFactura;
