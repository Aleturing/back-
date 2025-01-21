const db = require('../database/db');

// Obtener todos los clientes
exports.getClientes = (req, res) => {
    db.all('SELECT * FROM clientes', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener un cliente por ID
exports.getClienteById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(row);
    });
};

// Crear un nuevo cliente
exports.createCliente = (req, res) => {
    const { nombre, email, telefono, direccion, cedula, rif } = req.body;
    const query = 'INSERT INTO clientes (nombre, email, telefono, direccion, cedula, rif) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(query, [nombre, email, telefono, direccion, cedula, rif], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

// Actualizar un cliente
exports.updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, direccion, cedula, rif } = req.body;
    const query = 'UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ? WHERE id = ?';
    db.run(query, [nombre, email, telefono, direccion, cedula, rif, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente actualizado correctamente' });
    });
};

// Eliminar un cliente
exports.deleteCliente = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM clientes WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente eliminado correctamente' });
    });
};
