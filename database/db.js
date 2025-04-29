// db.js
const { Client } = require('pg');

// Cadena completa de conexión al Pooler de Supabase (reemplaza la contraseña si cambia)
const connectionString = 'postgresql://postgres:Fallout%23123456789Metro@aws-0-sa-east-1.pooler.supabase.com:5432/postgres';

// Cliente PostgreSQL
const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false    // SSL obligatorio para Supabase
  }
});

// Intento de conexión y prueba de consulta
client.connect(err => {
  if (err) {
    console.error('❌ Error al conectar al Pooler de Supabase:', err.message);
  } else {
    console.log('✅ Conexión exitosa al Pooler de Supabase (PostgreSQL).');
    // Test: listar tablas en schema público
    client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public';",
      (err, res) => {
        if (err) {
          console.error('❌ Error al listar tablas:', err.message);
        } else {
          console.log('📋 Tablas en la base de datos:', res.rows);
        }
        client.end();
      }
    );
  }
});

module.exports = client;
