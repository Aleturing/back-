const db = require("../database/db");
const Producto = {
  getAll: (callback) => {
    db.all('SELECT * FROM productos', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM productos WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const query = `
      INSERT INTO productos (nombre, descripcion, precio, stock, foto) 
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [nombre, descripcion, precio, stock, foto], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { nombre, descripcion, precio, stock, foto } = data;
    const query = `
      UPDATE productos 
      SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ? 
      WHERE id = ?
    `;
    db.run(query, [nombre, descripcion, precio, stock, foto, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM productos WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = Producto;
