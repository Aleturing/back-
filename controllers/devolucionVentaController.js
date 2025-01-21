const db = require('../database/db');

// Obtener todas las devoluciones de venta
exports.getDevolucionesVenta = (req, res) => {
    db.all('SELECT * FROM devolucion_venta', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener una devolución de venta por ID
exports.getDevolucionVentaById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM devolucion_venta WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Devolución de venta no encontrada' });
        }
        res.json(row);
    });
};

// Crear una nueva devolución de venta
exports.createDevolucionVenta = (req, res) => {
    const { factura_venta_id, motivo, tasa } = req.body;
    const query = 'INSERT INTO devolucion_venta (factura_venta_id, motivo, tasa) VALUES (?, ?, ?)';

    db.run(query, [factura_venta_id, motivo, tasa], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Devolución de venta creada correctamente', id: this.lastID });
    });
};

// Actualizar una devolución de venta
exports.updateDevolucionVenta = (req, res) => {
    const { id } = req.params;
    const { factura_venta_id, motivo, tasa } = req.body;
    const query = 'UPDATE devolucion_venta SET factura_venta_id = ?, motivo = ?, tasa = ? WHERE id = ?';

    db.run(query, [factura_venta_id, motivo, tasa, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Devolución de venta no encontrada' });
        }
        res.json({ message: 'Devolución de venta actualizada correctamente' });
    });
};

// Eliminar una devolución de venta
exports.deleteDevolucionVenta = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM devolucion_venta WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Devolución de venta no encontrada' });
        }
        res.json({ message: 'Devolución de venta eliminada correctamente' });
    });
};
