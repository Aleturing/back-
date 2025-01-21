const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'papeleria.sqlite'); //

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite.');
        db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, rows) => {
            if (err) {
                console.error('Error al listar tablas:', err.message);
            } else {
                console.log('Tablas existentes en la base de datos:', rows);
            }
        });
    }
});

module.exports = db;
