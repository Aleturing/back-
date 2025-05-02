const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Usa una clave segura definida en variables de entorno
const SECRET_KEY = process.env.JWT_SECRET || 'miClaveSecreta';

// Login de usuario con JWT
const loginUsuario = (req, res, next) => {
  const { nombre, contraseña } = req.body;
  if (!nombre || !contraseña) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  Usuario.obtenerPorNombre(nombre, (err, usuario) => {
    if (err) return next(err);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    bcrypt.compare(contraseña, usuario.contraseña, (err, esCorrecta) => {
      if (err) return next(err);
      if (!esCorrecta) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

      // Genera el token con payload mínimo
      const payload = { id: usuario.id, correo: usuario.correo };
      jwt.sign(
        payload,
        SECRET_KEY,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) return next(err);
          res.json({ mensaje: 'Login exitoso', token });
        }
      );
    });
  });
};

module.exports = {
  loginUsuario
};