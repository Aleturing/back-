// db.js (Conexión a MySQL en cPanel desde Render)
const mysql = require('mysql2');

// Configuración para MySQL en cPanel
const config = {
  user: 'movilpro_alfredo', // Tu usuario de base de datos MySQL
  host: 'movilprofit.com',   // Tu dominio de base de datos
  database: 'movilpro_papeleria', // Nombre de la base de datos
  password: 'Alfredo123456.,', // Contraseña de la base de datos
  port: 3306, // Puerto estándar de MySQL
  ssl: false, // No es necesario para la mayoría de los servidores en cPanel
};

// Crear la conexión a MySQL
const db = mysql.createPool(config);

// Función para verificar la conexión al iniciar
async function verificarConexion() {
  try {
    db.query('SELECT NOW()', (err, results) => {
      if (err) {
        console.error('❌ Error de conexión:', err.message);
        console.log('🔍 Verifica: host, usuario, contraseña y permisos externos en tu cPanel');
      } else {
        console.log('✅ Conexión exitosa a MySQL en cPanel:', results);
      }
    });
  } catch (err) {
    console.error('❌ Error al ejecutar la consulta:', err.message);
  }
}

verificarConexion();

// Exportar la conexión para reutilizarla
module.exports = db;
