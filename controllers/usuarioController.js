const bcrypt = require("bcryptjs");
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

// Crear un nuevo usuario
const crearUsuario = (req, res, next) => {
  const usuario = req.body;
  if (!usuario || !usuario.contraseña) {
    return res.status(400).json({ error: "Falta el campo 'contraseña'" });
  }

  bcrypt.hash(usuario.contraseña, 10, (err, hashedPassword) => {
    if (err) return next(err);
    usuario.contraseña = hashedPassword;

    Usuario.crear(usuario, (err, id) => {
      if (err) return next(err);
      res.status(201).json({ mensaje: "Usuario creado correctamente", id });
    });
  });
};

// Actualizar un usuario existente
const actualizarUsuario = (req, res, next) => {
  const { id } = req.params;
  const usuario = req.body;

  const actualizar = () => {
    Usuario.actualizar(id, usuario, (err) => {
      if (err) return next(err);
      res.json({ mensaje: "Usuario actualizado" });
    });
  };

  if (usuario.contraseña) {
    bcrypt.hash(usuario.contraseña, 10, (err, hashedPassword) => {
      if (err) return next(err);
      usuario.contraseña = hashedPassword;
      actualizar();
    });
  } else {
    actualizar();
  }
};

// Eliminar un usuario
const eliminarUsuario = (req, res, next) => {
  const { id } = req.params;
  Usuario.eliminar(id, (err) => {
    if (err) return next(err);
    res.json({ mensaje: "Usuario eliminado" });
  });
};

// Login de usuario: comparar contraseña encriptada
const loginUsuario = (req, res, next) => {
  const { nombre, contraseña } = req.body;
  if (!nombre || !contraseña) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  Usuario.obtenerPorNombre(nombre, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    bcrypt.compare(contraseña, row.contraseña, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return res.status(400).json({ mensaje: "Contraseña incorrecta" });
      res.json({ mensaje: "Login exitoso", usuario: row });
    });
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
