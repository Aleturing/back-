const db = require("../database/db");

/**
 * Modelo Administrador para operaciones CRUD sobre la tabla `administrador`.
 */
const Administrador = {
  /** Listar todos los administradores */
  obtenerTodos(callback) {
    const sql = "SELECT * FROM administrador";
    db.query(sql, (err, results) => callback(err, results));
  },

  /** Obtener un administrador por ID */
  obtenerPorId(id, callback) {
    const sql = "SELECT * FROM administrador WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      const admin = Array.isArray(results) && results.length > 0 ? results[0] : null;
      callback(null, admin);
    });
  },

  /** Crear un nuevo administrador */
  crear(data, callback) {
    const { usuario_id, nivel_acceso } = data;
    const sql = `
      INSERT INTO administrador (usuario_id, nivel_acceso)
      VALUES (?, ?)
    `;
    db.query(sql, [usuario_id, nivel_acceso], (err, results) => {
      if (err) return callback(err);
      const insertId = results && typeof results.insertId === 'number' ? results.insertId : null;
      callback(null, insertId);
    });
  },

  /** Actualizar un administrador existente */
  actualizar(id, data, callback) {
    const { nivel_acceso } = data;
    const sql = `
      UPDATE administrador
      SET nivel_acceso = ?
      WHERE id = ?
    `;
    db.query(sql, [nivel_acceso, id], (err, results) => {
      if (err) return callback(err);
      const affected = results && typeof results.affectedRows === 'number' ? results.affectedRows : 0;
      callback(null, affected);
    });
  },

  /** Eliminar un administrador por su ID */
  eliminar(id, callback) {
    const sql = "DELETE FROM administrador WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      const deleted = results && typeof results.affectedRows === 'number' ? results.affectedRows : 0;
      callback(null, deleted);
    });
  }
};

module.exports = Administrador;