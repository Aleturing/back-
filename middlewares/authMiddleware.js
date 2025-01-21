const jwt = require("jsonwebtoken");


const SECRET_KEY = "mi_clave_secreta"; 

const verificarToken = (req, res, next) => {
  // Obtener el token 
  const token = req.header("Authorization");

  // no hay token, enviar error
  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. No se proporcionó un token." });
  }

  try {
   
    const tokenSinBearer = token.replace("Bearer ", "");

    // el token con la clave secreta
    jwt.verify(tokenSinBearer, SECRET_KEY, (err, usuario) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválido." });
      }

      // Si el token es válido, asignar la información del usuario a la request
      req.user = usuario;
      next(); 
    });
  } catch (err) {
    res.status(500).json({ mensaje: "Hubo un error al verificar el token." });
  }
};

module.exports = verificarToken;
