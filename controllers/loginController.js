const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");

// Cambia esta clave secreta con una más segura y mantenla en un entorno seguro.
const SECRET_KEY = "miClaveSecreta"; // Idealmente, deberías almacenar esta clave en un archivo .env

// Login de usuario
const loginUsuario = (req, res) => {
  const { nombre, contraseña } = req.body;

  // Verificamos si el correo existe en la base de datos
  Usuario.obtenerPorNombre(nombre, (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la contraseña cifrada almacenada
    bcrypt.compare(contraseña, usuario.contraseña, (err, esCorrecta) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!esCorrecta) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }

      // Si la contraseña es correcta, generamos un token JWT
      const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, SECRET_KEY, { expiresIn: '1h' });

      // Devolvemos el token al cliente
      res.json({ mensaje: "Login exitoso", token });
    });
  });
};

module.exports = {
  loginUsuario
};
