const db = require('../database/db');

// Obtener todos los detalles de las facturas
exports.getDetallesFactura = (req, res) => {
    db.all('SELECT * FROM detalle_factura', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener un detalle de factura por ID
exports.getDetalleFacturaById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM detalle_factura WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Detalle de factura no encontrado' });
        }
        res.json(row);
    });
};

// Crear un nuevo detalle de factura
exports.createDetalleFactura = (req, res) => {
    const { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario } = req.body;
    const query = 'INSERT INTO detalle_factura (factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

// Actualizar un detalle de factura
exports.updateDetalleFactura = (req, res) => {
    const { id } = req.params;
    const { factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario } = req.body;
    const query = 'UPDATE detalle_factura SET factura_compra_id = ?, factura_venta_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ? WHERE id = ?';
    db.run(query, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Detalle de factura actualizado correctamente' });
    });
};

// Eliminar un detalle de factura
exports.deleteDetalleFactura = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM detalle_factura WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Detalle de factura eliminado correctamente' });
    });
};
