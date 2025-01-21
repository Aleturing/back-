const jwt = require('jsonwebtoken');

// Esta es la clave secreta que utilizaste para firmar el JWT
const SECRET_KEY = "miClaveSecreta"; 

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ mensaje: "Token no proporcionado" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "Token inválido" });
    }

    req.user = decoded; // Decodifica el token y lo guarda en `req.user`
    next(); // Permite que la solicitud continúe a la siguiente función
  });
};

module.exports = verificarToken;
