const db = require('../database/db');

const Cliente = {
  obtenerTodos(callback) {
    db.all('SELECT * FROM clientes', [], callback);
  },

  obtenerPorId(id, callback) {
    db.get('SELECT * FROM clientes WHERE id = ?', [id], callback);
  },

  crear({ nombre, email, telefono, direccion, cedula, rif }, callback) {
    const query = `
      INSERT INTO clientes (nombre, email, telefono, direccion, cedula, rif)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [nombre, email, telefono, direccion, cedula, rif], function (err) {
      callback(err, this?.lastID);
    });
  },

  actualizar(id, { nombre, email, telefono, direccion, cedula, rif }, callback) {
    const query = `
      UPDATE clientes
      SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ?
      WHERE id = ?
    `;
    db.run(query, [nombre, email, telefono, direccion, cedula, rif, id], callback);
  },

  eliminar(id, callback) {
    const query = 'DELETE FROM clientes WHERE id = ?';
    db.run(query, [id], callback);
  }
};

module.exports = Cliente;
