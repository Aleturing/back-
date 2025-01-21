const db = require('../database/db');

// Obtener todas las facturas de venta
exports.getFacturasVenta = (req, res) => {
    const query = `
        SELECT 
            f.id, 
            f.cliente_id, 
            f.fecha, 
            f.total, 
            u.nombre AS usuario_nombre, 
            f.anulada, 
            f.tasa, 
            f.detalle_factura_id, 
            f.devolucion_venta_id 
        FROM factura_venta f
        Left JOIN usuario u ON f.usuario_id = u.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};


// Obtener una factura de venta por ID
exports.getFacturaVentaById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM factura_venta WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Factura de venta no encontrada' });
        }
        res.json(row);
    });
};

// Crear una nueva factura de venta
exports.createFacturaVenta = (req, res) => {
    const { cliente_id, total, usuario_id, tasa, detalle_factura_id, devolucion_venta_id } = req.body;
    const query = 'INSERT INTO factura_venta (cliente_id, total, usuario_id, tasa, detalle_factura_id, devolucion_venta_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.run(query, [cliente_id, total, usuario_id, tasa, detalle_factura_id, devolucion_venta_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

// Actualizar una factura de venta
exports.updateFacturaVenta = (req, res) => {
    const { id } = req.params;
    const { cliente_id, total, usuario_id, tasa, detalle_factura_id, devolucion_venta_id } = req.body;
    const query = 'UPDATE factura_venta SET cliente_id = ?, total = ?, usuario_id = ?, tasa = ?, detalle_factura_id = ?, devolucion_venta_id = ? WHERE id = ?';
    db.run(query, [cliente_id, total, usuario_id, tasa, detalle_factura_id, devolucion_venta_id, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Factura de venta actualizada correctamente' });
    });
};

// Eliminar una factura de venta
exports.deleteFacturaVenta = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM factura_venta WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Factura de venta eliminada correctamente' });
    });
};
