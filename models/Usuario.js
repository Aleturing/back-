const db = require("../database/db");

const Usuario = {
  obtenerTodos: (callback) => {
    const query = "SELECT * FROM usuario";
    db.all(query, [], callback);
  },

  obtenerPorId: (id, callback) => {
    const query = "SELECT * FROM usuario WHERE id = ?";
    db.get(query, [id], callback);
  },

  crear: (usuario, callback) => {
    const query =
      'INSERT INTO usuario (nombre, correo, "contraseña") VALUES (?, ?, ?)';
    db.run(
      query,
      [usuario.nombre, usuario.correo, usuario.contraseña],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, this.lastID); // Retorna el ID del nuevo usuario
        }
      }
    );
  },

  obtenerPorNombre: (nombre, callback) => { 
    const sql = "SELECT * FROM usuario WHERE nombre = ?";
    db.get(sql, [nombre], (err, row) => {
      callback(err, row);
    });
  },

  actualizar: (id, usuario, callback) => {
    const query =
      'UPDATE usuario SET nombre = ?, correo = ?, "contraseña" = ? WHERE id = ?';
    db.run(
      query,
      [usuario.nombre, usuario.correo, usuario.contraseña, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    const query = "DELETE FROM usuario WHERE id = ?";
    db.run(query, [id], callback);
  },
};

module.exports = Usuario;
