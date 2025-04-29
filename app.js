const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg"); // Añadimos el cliente PostgreSQL

// ================== Configuración PostgreSQL (cPanel) ==================
const pool = new Pool({
  host: "localhost", // o la IP del servidor PostgreSQL
  port: 5432, // Puerto predeterminado
  user: "papelera_admin_papelera", // Ej: admin_papelera
  password: "Fallout#123456789Metro", // La que creaste en cPanel
  database: "papelera_db", // Ej: papelera_db
  ssl: {
    rejectUnauthorized: false // Necesario en la mayoría de hostings compartidos
  }
});

// Verificar conexión a la base de datos
pool.query("SELECT NOW()")
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

// ================== Configuración de rate limiting ==================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// ================== Middlewares ==================
app.use(cors({
  origin: [
    "https://tufrontend.com", // URL de tu frontend en producción
    "http://localhost:3000" // Para desarrollo
  ]
}));
app.use(helmet());
app.use(limiter);
app.use(express.json());

// ================== Importar rutas ==================
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const verificarToken = require("./middlewares/authMiddleware");

// ================== Inyectar pool en las rutas ==================
// Modifica tus archivos de rutas para recibir el pool como parámetro
app.use("/api", routes(pool));
app.use("/auth", authRoutes(pool));

// ================== Ruta protegida de ejemplo ==================
app.use("/api/protegida", verificarToken, (req, res) => {
  res.json({ mensaje: "Acceso autorizado", usuario: req.user });
});

// ================== Iniciar servidor ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});