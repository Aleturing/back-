const db = require('../database/db');

const Administrador = {
  obtenerTodos(callback) {
    db.all('SELECT * FROM administrador', [], callback);
  },

  obtenerPorId(id, callback) {
    db.get('SELECT * FROM administrador WHERE id = ?', [id], callback);
  },

  crear({ usuario_id, nivel_acceso }, callback) {
    const query = 'INSERT INTO administrador (usuario_id, nivel_acceso) VALUES (?, ?)';
    db.run(query, [usuario_id, nivel_acceso], function (err) {
      callback(err, this?.lastID);
    });
  },

  actualizar(id, { usuario_id, nivel_acceso }, callback) {
    const query = 'UPDATE administrador SET usuario_id = ?, nivel_acceso = ? WHERE id = ?';
    db.run(query, [usuario_id, nivel_acceso, id], callback);
  },

  eliminar(id, callback) {
    const query = 'DELETE FROM administrador WHERE id = ?';
    db.run(query, [id], callback);
  }
};

module.exports = Administrador;
