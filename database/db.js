const { Client } = require('pg');
const path = require('path');

// Configura la conexión con PostgreSQL (ajusta los valores según tu configuración)
const client = new Client({
    user: 'tu_usuario',
    host: 'localhost', // o tu host de base de datos
    database: 'papeleria', // nombre de la base de datos
    password: 'tu_contraseña',
    port: 5432,
});

client.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos PostgreSQL:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos PostgreSQL.');
        // Listar tablas en la base de datos
        client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';", (err, res) => {
            if (err) {
                console.error('Error al listar tablas:', err.message);
            } else {
                console.log('Tablas existentes en la base de datos:', res.rows);
            }
            // Cierra la conexión después de realizar la consulta
            client.end();
        });
    }
});
