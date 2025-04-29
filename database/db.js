// La contraseña con caracteres especiales
const password = 'Fallout#123456789Metro';

// Codificamos la contraseña
const encodedPassword = encodeURIComponent(password);

// Construimos la URL de conexión
const supabaseConnectionUrl = `postgresql://postgres:${encodedPassword}@db.sytbqsmmmeetawleiktx.supabase.co:5432/postgres`;

// Luego, puedes usar esta URL en tu cliente de conexión
const { Client } = require('pg');
const client = new Client({
    connectionString: supabaseConnectionUrl,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos PostgreSQL:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos PostgreSQL en Supabase.');
        client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';", (err, res) => {
            if (err) {
                console.error('Error al listar tablas:', err.message);
            } else {
                console.log('Tablas existentes en la base de datos:', res.rows);
            }
            client.end();
        });
    }
});
