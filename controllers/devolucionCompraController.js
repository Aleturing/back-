const db = require('../database/db');

// Obtener todas las devoluciones de compra
exports.getDevolucionesCompra = (req, res) => {
    db.all('SELECT * FROM devolucion_compra', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener una devolución de compra por ID
exports.getDevolucionCompraById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM devolucion_compra WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Devolución de compra no encontrada' });
        }
        res.json(row);
    });
};

// Crear una nueva devolución de compra
exports.createDevolucionCompra = (req, res) => {
    const { factura_compra_id, motivo, tasa } = req.body;
    const query = 'INSERT INTO devolucion_compra (factura_compra_id, motivo, tasa) VALUES (?, ?, ?)';
    
    db.run(query, [factura_compra_id, motivo, tasa], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Devolución de compra creada correctamente', id: this.lastID });
    });
};

// Actualizar una devolución de compra
exports.updateDevolucionCompra = (req, res) => {
    const { id } = req.params;
    const { factura_compra_id, motivo, tasa } = req.body;
    const query = 'UPDATE devolucion_compra SET factura_compra_id = ?, motivo = ?, tasa = ? WHERE id = ?';

    db.run(query, [factura_compra_id, motivo, tasa, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Devolución de compra no encontrada' });
        }
        res.json({ message: 'Devolución de compra actualizada correctamente' });
    });
};

// Eliminar una devolución de compra
exports.deleteDevolucionCompra = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM devolucion_compra WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Devolución de compra no encontrada' });
        }
        res.json({ message: 'Devolución de compra eliminada correctamente' });
    });
};

