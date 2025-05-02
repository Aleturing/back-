const Usuario = require("../models/Usuario");

// Listar todos los usuarios
const obtenerUsuarios = (req, res, next) => {
  Usuario.obtenerTodos((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = (req, res, next) => {
  const { id } = req.params;
  Usuario.obtenerPorId(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(row);
  });
};

// Crear un nuevo usuario (contraseña sin encriptar)
const crearUsuario = (req, res, next) => {
  const usuario = req.body;
  if (!usuario || !usuario.contraseña) {
    return res.status(400).json({ error: "Falta el campo 'contraseña'" });
  }

  // No encriptamos la contraseña
  Usuario.crear(usuario, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ mensaje: "Usuario creado correctamente", id });
  });
};

// Actualizar un usuario existente (sin encriptar contraseña)
const actualizarUsuario = (req, res, next) => {
  const { id } = req.params;
  const usuario = req.body;

  Usuario.actualizar(id, usuario, (err) => {
    if (err) return next(err);
    res.json({ mensaje: "Usuario actualizado" });
  });
};

// Eliminar un usuario
const eliminarUsuario = (req, res, next) => {
  const { id } = req.params;
  Usuario.eliminar(id, (err) => {
    if (err) return next(err);
    res.json({ mensaje: "Usuario eliminado" });
  });
};

// Login de usuario sin encriptación
const loginUsuario = (req, res, next) => {
  const { nombre, contraseña } = req.body;
  if (!nombre || !contraseña) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  Usuario.obtenerPorNombre(nombre, (err, usuario) => {
    if (err) return next(err);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    if (contraseña !== usuario.contraseña) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    res.json({ mensaje: "Login exitoso", usuario });
  });
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
};
