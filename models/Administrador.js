const db = require("../database/db");

const Administrador = {
  getAll: (callback) => {
    db.all('SELECT * FROM administrador', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM administrador WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { usuario_id, nivel_acceso } = data;
    const query = 'INSERT INTO administrador (usuario_id, nivel_acceso) VALUES (?, ?)';
    db.run(query, [usuario_id, nivel_acceso], function (err) {
      callback(err, this?.lastID);
    });
  },

  update: (id, data, callback) => {
    const { usuario_id, nivel_acceso } = data;
    const query = 'UPDATE administrador SET usuario_id = ?, nivel_acceso = ? WHERE id = ?';
    db.run(query, [usuario_id, nivel_acceso, id], function (err) {
      callback(err, this?.changes);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM administrador WHERE id = ?';
    db.run(query, [id], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = Administrador;
