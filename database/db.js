// db.js
const { Client } = require('pg');

// Cadena completa de conexión al Pooler de Supabase con la contraseña correcta
const connectionString = 'postgresql://postgres.sytbqsmmmeetawleiktx:Fallout%23123456789Metro@aws-0-sa-east-1.pooler.supabase.com:5432/postgres';

// Crear el cliente de PostgreSQL
const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false // SSL obligatorio para Supabase
  }
});

// Intentar conectar y hacer una consulta de prueba
client.connect(err => {
  if (err) {
    console.error('❌ Error al conectar al Pooler de Supabase:', err.message);
  } else {
    console.log('✅ Conexión exitosa al Pooler de Supabase (PostgreSQL).');
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
