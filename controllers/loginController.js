const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const SECRET_KEY = process.env.JWT_SECRET || 'miClaveSecreta';

const loginUsuario = (req, res, next) => {
  const { nombre, contraseña } = req.body;

  if (!nombre || !contraseña) {
    return res.status(400).json({ error: 'Faltan credenciales' });
  }

  Usuario.obtenerPorNombre(nombre, (err, usuario) => {
    if (err) return next(err);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Comparación directa sin encriptar
    if (contraseña !== usuario.contraseña) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const payload = { id: usuario.id, correo: usuario.correo };
    jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) return next(err);
      res.json({ mensaje: 'Login exitoso', token });
    });
  });
};

module.exports = {
  loginUsuario
};
