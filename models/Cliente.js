const db = require('../db');

const Cliente = {
  getAll: (callback) => {
    db.all('SELECT * FROM clientes', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM clientes WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, email, telefono, direccion, cedula, rif } = data;
    const query = `
      INSERT INTO clientes (nombre, email, telefono, direccion, cedula, rif) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [nombre, email, telefono, direccion, cedula, rif], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { nombre, email, telefono, direccion, cedula, rif } = data;
    const query = `
      UPDATE clientes 
      SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ? 
      WHERE id = ?
    `;
    db.run(query, [nombre, email, telefono, direccion, cedula, rif, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM clientes WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = Cliente;
