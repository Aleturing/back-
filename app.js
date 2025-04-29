const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet"); // <- Paso 2: Seguridad
const rateLimit = require("express-rate-limit"); // <- Paso 2: Limitar requests

// Configuración de rate limiting (agregar esto)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
});

// ================== Middlewares ==================
app.use(cors());
app.use(helmet()); // <- Aquí aplicamos helmet
app.use(limiter); // <- Aquí aplicamos el rate limiting
app.use(express.json());

// ================== Importar rutas ==================
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const verificarToken = require("./middlewares/authMiddleware");

// ================== Rutas ==================
app.use("/api", routes);
app.use("/auth", authRoutes);

// Ruta protegida de ejemplo
app.use("/api/protegida", verificarToken, (req, res) => {
  res.json({ mensaje: "Acceso autorizado", usuario: req.user });
});

// ================== Iniciar servidor ==================
const PORT = process.env.PORT || 3000; // Mejor usar variable de entorno
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});