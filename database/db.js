// db.js (Conexión a PostgreSQL en cPanel desde Render)
const { Pool } = require('pg');

// Configuración para PostgreSQL en cPanel
const config = {
  user: 'movilpro_alfredo', // Tu usuario de base de datos PostgreSQL
  host: 'movilprofit.com',    // Ejemplo: db.tudominio.com
  database: 'movilpro_papeleria', // Nombre de la base de datos
  password: 'Alfredo123456.,', // Contraseña de la base de datos
  port: 3306, // Puerto estándar de PostgreSQL (a menos que cPanel use otro)
  ssl: false, // La mayoría de servidores en cPanel no requieren SSL para conexiones internas
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
};

// Crear el pool de conexiones
const db = new Pool(config);

// Función para verificar la conexión al iniciar
async function verificarConexion() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('✅ Conexión exitosa a PostgreSQL en cPanel:', res.rows[0]);
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    console.log('🔍 Verifica: host, usuario, contraseña y permisos externos en tu cPanel');
  }
}

verificarConexion();

// Exportar el pool para reutilizar conexiones
module.exports = db;