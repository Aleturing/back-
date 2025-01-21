const db = require('../database/db');

// Obtener todos los administradores
exports.getAdministradores = (req, res) => {
    db.all('SELECT * FROM administrador', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener un administrador por ID
exports.getAdministradorById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM administrador WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.json(row);
    });
};

// Crear un nuevo administrador
exports.createAdministrador = (req, res) => {
    const { usuario_id, nivel_acceso } = req.body;
    const query = 'INSERT INTO administrador (usuario_id, nivel_acceso) VALUES (?, ?)';

    db.run(query, [usuario_id, nivel_acceso], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Administrador creado correctamente', id: this.lastID });
    });
};

// Actualizar un administrador
exports.updateAdministrador = (req, res) => {
    const { id } = req.params;
    const { usuario_id, nivel_acceso } = req.body;
    const query = 'UPDATE administrador SET usuario_id = ?, nivel_acceso = ? WHERE id = ?';

    db.run(query, [usuario_id, nivel_acceso, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.json({ message: 'Administrador actualizado correctamente' });
    });
};

// Eliminar un administrador
exports.deleteAdministrador = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM administrador WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        res.json({ message: 'Administrador eliminado correctamente' });
    });
};
