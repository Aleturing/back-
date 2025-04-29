const { Client } = require('pg');

// La URL de conexión a PostgreSQL proporcionada por Supabase
const supabaseConnectionUrl = 'postgresql://postgres:[Fallout#123456789Metro]@db.sytbqsmmmeetawleiktx.supabase.co:5432/postgres';

// Configura la conexión con PostgreSQL (ajusta la URL según tu configuración de Supabase)
const client = new Client({
    connectionString: supabaseConnectionUrl,
});

client.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos PostgreSQL:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos PostgreSQL en Supabase.');
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
