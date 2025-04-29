// db.js

const { Client } = require('pg');

// Configuración de conexión
const client = new Client({
    host: 'db.sytbqsmmmeetawleiktx.supabase.co', // Host de Supabase (sin protocolo)
    port: 5432, // Puerto estándar de PostgreSQL
    user: 'postgres', // Tu usuario de la base de datos
    password: 'Fallout#123456789Metro', // Tu contraseña (sin codificar)
    database: 'postgres', // Nombre de tu base de datos
    ssl: {
        rejectUnauthorized: false // Importante para conexión segura en Render
    }
});

// Conectamos
client.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos PostgreSQL:', err.message);
    } else {
        console.log('✅ Conexión exitosa a la base de datos PostgreSQL en Supabase.');
        
        // Ejemplo: listar tablas
        client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';", (err, res) => {
            if (err) {
                console.error('❌ Error al listar tablas:', err.message);
            } else {
                console.log('📋 Tablas existentes en la base de datos:', res.rows);
            }
            
            // Cerramos la conexión
            client.end();
        });
    }
});

module.exports = client;
