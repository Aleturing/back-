const db = require("../database/db");

const Usuario = {
  obtenerTodos: (callback) => {
    const sql = "SELECT * FROM usuario";
    db.query(sql, (err, results) => {
      // results es un array de filas
      callback(err, results);
    });
  },

  obtenerPorId: (id, callback) => {
    const sql = "SELECT * FROM usuario WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      // devolvemos sólo la primera fila (o undefined)
      callback(err, results[0]);
    });
  },

  crear: (usuario, callback) => {
    const sql =
      "INSERT INTO usuario (nombre, correo, contraseña) VALUES (?, ?, ?)";
    db.query(
      sql,
      [usuario.nombre, usuario.correo, usuario.contraseña],
      (err, results) => {
        if (err) return callback(err, null);
        // results.insertId es el id del nuevo registro
        callback(null, results.insertId);
      }
    );
  },

  obtenerPorNombre: (nombre, callback) => {
    const sql = "SELECT * FROM usuario WHERE nombre = ?";
    db.query(sql, [nombre], (err, results) => {
      callback(err, results[0]);
    });
  },

  actualizar: (id, usuario, callback) => {
    const sql =
      "UPDATE usuario SET nombre = ?, correo = ?, contraseña = ? WHERE id = ?";
    db.query(
      sql,
      [usuario.nombre, usuario.correo, usuario.contraseña, id],
      (err, results) => {
        callback(err, results);
      }
    );
  },

  eliminar: (id, callback) => {
    const sql = "DELETE FROM usuario WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      callback(err, results);
    });
  },
};

module.exports = Usuario;
