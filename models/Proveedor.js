const db = require('../db');

const Proveedor = {
  getAll: (callback) => {
    db.all('SELECT * FROM proveedores', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM proveedores WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, email, telefono, direccion, cedula, rif } = data;
    const query = `
      INSERT INTO proveedores (nombre, email, telefono, direccion, cedula, rif) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [nombre, email, telefono, direccion, cedula, rif], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { nombre, email, telefono, direccion, cedula, rif } = data;
    const query = `
      UPDATE proveedores 
      SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ? 
      WHERE id = ?
    `;
    db.run(query, [nombre, email, telefono, direccion, cedula, rif, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM proveedores WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = Proveedor;
