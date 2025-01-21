const express = require("express");
const app = express();
const cors = require("cors");

// Importar rutas
const routes = require("./routes"); // Tus rutas generales (productos, usuarios, etc.)
const authRoutes = require("./routes/authRoutes");  // Rutas de autenticación (login)
const verificarToken = require("./middlewares/authMiddleware"); // Middleware para verificar el token


app.use(cors());

//JSON
app.use(express.json());

// Usar rutas
app.use("/api", routes); 
app.use("/auth", authRoutes); // login


app.use("/api/protegida", verificarToken, (req, res) => {
  res.json({ mensaje: "Acceso autorizado", usuario: req.user });
});

// iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
