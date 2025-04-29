const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
};

const obtenerUsuarioPorId = (req, res) => {
  const { id } = req.params;
  Usuario.obtenerPorId(id, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      res.json(row);
    }
  });
};

const crearUsuario = (req, res) => {
  const usuario = req.body;
  
  // ecriptar la contraseña antes de almacenarla
  bcrypt.hash(usuario.contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // reemplazar la contraseña 
    usuario.contraseña = hashedPassword;

    // guardar el usuario con la contraseña encriptada
    Usuario.crear(usuario, (err, id) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          mensaje: "Usuario creado correctamente",
          id,
        });
      }
    });
  });
};

const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const usuario = req.body;

  // si la contraseña ha cambiado, la encripto
  if (usuario.contraseña) {
    bcrypt.hash(usuario.contraseña, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // reemplazar la contraseña en el objeto usuario con la versión encriptada
      usuario.contraseña = hashedPassword;

      // actualizar el usuario 
      Usuario.actualizar(id, usuario, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ mensaje: "Usuario actualizado" });
        }
      });
    });
  } else {
    // actualizamos los demás campos
    Usuario.actualizar(id, usuario, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ mensaje: "Usuario actualizado" });
      }
    });
  }
};

const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.eliminar(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ mensaje: "Usuario eliminado" });
    }
  });
};

// Función de login, para comprobar la contraseña encriptada
const loginUsuario = (req, res) => {
  const { nombre, contraseña } = req.body;

  Usuario.obtenerPorNombre(nombre, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    } else {
      // comparar la contraseña ingresada con la contraseña encriptada en la base de datos
      bcrypt.compare(contraseña, row.contraseña, (err, isMatch) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (isMatch) {
          // si la contraseña coincide
          res.json({ mensaje: "Login exitoso", usuario: row });
        } else {
          // si la contraseña no coincide
          res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }
      });
    }
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
