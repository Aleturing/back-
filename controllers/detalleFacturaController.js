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

    // Paso 1: Verificar el stock actual del producto
    const checkStockQuery = 'SELECT stock FROM productos WHERE id = ?';
    db.get(checkStockQuery, [producto_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Si no se encuentra el producto, retornamos un error
        if (!row) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const stockActual = row.stock;

        // Paso 2: Verificar si hay suficiente stock para completar la compra
        if (stockActual < cantidad) {
            return res.status(400).json({ error: 'No hay suficiente stock disponible' });
        }

        // Paso 3: Restar la cantidad comprada del stock
        const updateStockQuery = 'UPDATE productos SET stock = stock - ? WHERE id = ?';
        db.run(updateStockQuery, [cantidad, producto_id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Paso 4: Insertar el detalle de la factura
            const insertDetalleQuery = 'INSERT INTO detalle_factura (factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)';
            db.run(insertDetalleQuery, [factura_compra_id, factura_venta_id, producto_id, cantidad, precio_unitario], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                // Paso 5: Devolver la respuesta con el ID del detalle de factura creado
                res.status(201).json({ id: this.lastID });
            });
        });
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
