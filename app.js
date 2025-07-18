const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// ================== Seguridad y control de tráfico ==================

// Configuración de CORS con múltiples orígenes permitidos
const allowedOrigins = [
  'http://localhost:3001',
  'https://notify-treat-perform-multimedia.trycloudflare.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
}));

// Helmet para seguridad en headers HTTP
app.use(helmet());

// Rate limiting para evitar abusos (100 requests cada 15 minutos por IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Middleware para parsear JSON en el body
app.use(express.json());

// ================== Rutas ==================
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const verificarToken = require("./middlewares/authMiddleware");

// Rutas públicas
app.use("/api", routes);
app.use("/auth", authRoutes);

// Ruta protegida de ejemplo
app.use("/api/protegida", verificarToken, (req, res) => {
  res.json({ mensaje: "Acceso autorizado", usuario: req.user });
});

// ================== Servidor ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
