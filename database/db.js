// db.js (Conexión a PostgreSQL en cPanel desde Render)
const { Pool } = require('pg');

// Configuración para PostgreSQL en cPanel
const config = {
  user: 'papelera_admin_papelera', // Tu usuario de base de datos PostgreSQL
  host: 'papelerapreverbusiness.net',    // Ejemplo: db.tudominio.com
  database: 'papelera_db', // Nombre de la base de datos
  password: 'Fallout#123456789Metro', // Contraseña de la base de datos
  port: 5432, // Puerto estándar de PostgreSQL (a menos que cPanel use otro)
  ssl: false, // La mayoría de servidores en cPanel no requieren SSL para conexiones internas
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
};

// Crear el pool de conexiones
const pool = new Pool(config);

// Verificar conexión al iniciar
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Conexión exitosa a PostgreSQL en cPanel'))
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    console.log('🔍 Verifica: host, usuario, contraseña y permisos externos en tu cPanel');
  });

// Exportar el pool para reutilizar conexiones
module.exports = pool;
