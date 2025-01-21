const db = require('../database/db');

// Obtener todas las facturas de compra
exports.getFacturasCompra = (req, res) => {
    db.all('SELECT * FROM factura_compra', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener una factura de compra por ID
exports.getFacturaCompraById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM factura_compra WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Factura de compra no encontrada' });
        }
        res.json(row);
    });
};

// Crear una nueva factura de compra
exports.createFacturaCompra = (req, res) => {
    const { proveedor_id, total, usuario_id, tasa, detalle_factura_id } = req.body;
    const query = 'INSERT INTO factura_compra (proveedor_id, total, usuario_id, tasa, detalle_factura_id) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [proveedor_id, total, usuario_id, tasa, detalle_factura_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

// Actualizar una factura de compra
exports.updateFacturaCompra = (req, res) => {
    const { id } = req.params;
    const { proveedor_id, total, usuario_id, tasa, detalle_factura_id } = req.body;
    const query = 'UPDATE factura_compra SET proveedor_id = ?, total = ?, usuario_id = ?, tasa = ?, detalle_factura_id = ? WHERE id = ?';
    db.run(query, [proveedor_id, total, usuario_id, tasa, detalle_factura_id, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Factura de compra actualizada correctamente' });
    });
};

// Eliminar una factura de compra
exports.deleteFacturaCompra = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM factura_compra WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Factura de compra eliminada correctamente' });
    });
};
