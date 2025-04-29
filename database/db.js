// db.js (Versión Corregida y Optimizada)
const { Pool } = require('pg');

// Configuración óptima para Supabase PostgreSQL
const config = {
  user: 'postgres.sytbqsmmmeetawleiktx', // Usuario con formato: postgres.[project-ref-id]
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  database: 'postgres',
  password: 'Fallout#123456789Metro', // La # debe estar URL-encoded como %23
  port: 6543, // Puerto obligatorio para el Pooler
  ssl: {
    rejectUnauthorized: false, // SSL requerido
    ca: '' // Agrega el certificado si es necesario
  },
  max: 20, // Máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
};

// Crear el pool de conexiones
const pool = new Pool(config);

// Verificar conexión al iniciar
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Conexión exitosa al Pooler de Supabase'))
  .catch(err => {
    console.error('❌ Error de conexión:', err.message);
    console.log('🔍 Verifica:');
    console.log('1. Credenciales en Supabase > Project Settings > Database');
    console.log('2. Connection Pooling habilitado en modo Session');
    console.log('3. IP de tu hosting en Network Restrictions');
  });

// Exportar el pool para reutilizar conexiones
module.exports = pool;