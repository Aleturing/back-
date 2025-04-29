// db.js
require('dotenv').config();
const { Client } = require('pg');

// Puedes poner esta URL en tu .env como DATABASE_URL:
// DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
const poolerUrl = process.env.DATABASE_URL;

// Si prefieres codificar la contraseña en el propio archivo:
// const password = 'YOUR_PASSWORD';
// const encodedPassword = encodeURIComponent(password);
// const poolerUrl = `postgresql://postgres:${encodedPassword}@aws-0-sa-east-1.pooler.supabase.com:5432/postgres`;

const client = new Client({
  connectionString: poolerUrl,
  ssl: {
    rejectUnauthorized: false    // SSL obligatorio para Supabase
  }
});

client.connect(err => {
  if (err) {
    console.error('❌ Error al conectar al Pooler de Supabase:', err.message);
  } else {
    console.log('✅ Conexión exitosa al Pooler de Supabase (PostgreSQL).');
    // Test: listar tablas
    client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public';",
      (err, res) => {
        if (err) {
          console.error('❌ Error al listar tablas:', err.message);
        } else {
          console.log('📋 Tablas:', res.rows);
        }
        client.end();
      }
    );
  }
});

module.exports = client;
