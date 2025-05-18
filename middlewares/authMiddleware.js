const jwt = require("jsonwebtoken");

const SECRET_KEY = "mi_clave_secreta"; // Usa variable de entorno en producción

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const tokenSinBearer = token.replace("Bearer ", "");

    jwt.verify(tokenSinBearer, SECRET_KEY, (err, usuario) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválido." });
      }

      req.user = usuario;
      next();
    });
  } catch (err) {
    res.status(500).json({ mensaje: "Hubo un error al verificar el token." });
  }
};

module.exports = verificarToken;
