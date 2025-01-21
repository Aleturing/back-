const db = require('../database/db');

// Obtener todos los productos
exports.getProductos = (req, res) => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Obtener un producto por ID
exports.getProductoById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM productos WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(row);
    });
};

// Crear un nuevo producto
exports.createProducto = (req, res) => {
    const { nombre, descripcion, precio, stock, foto } = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, foto) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [nombre, descripcion, precio, stock, foto], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
};

// Actualizar un producto
exports.updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, foto } = req.body;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, foto = ? WHERE id = ?';
    db.run(query, [nombre, descripcion, precio, stock, foto, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto actualizado correctamente' });
    });
};

// Eliminar un producto
exports.deleteProducto = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM productos WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    });
};
