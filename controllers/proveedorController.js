// controllers/proveedorController.js
const db = require('../database/db');

// Obtener todos los proveedores
exports.getProveedores = (req, res) => {
  db.all('SELECT * FROM proveedores', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los proveedores', error: err });
    }
    res.json(rows);
  });
};

// Obtener un proveedor por ID
exports.getProveedorById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM proveedores WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el proveedor', error: err });
    }
    if (!row) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json(row);
  });
};

// Crear un nuevo proveedor
exports.createProveedor = (req, res) => {
  const { nombre, email, telefono, direccion, cedula, rif } = req.body;
  const query = 'INSERT INTO proveedores (nombre, email, telefono, direccion, cedula, rif) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(query, [nombre, email, telefono, direccion, cedula, rif], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error al crear el proveedor', error: err });
    }
    res.status(201).json({ message: 'Proveedor creado correctamente', id: this.lastID });
  });
};

// Actualizar un proveedor existente
exports.updateProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, cedula, rif } = req.body;
  const query = 'UPDATE proveedores SET nombre = ?, email = ?, telefono = ?, direccion = ?, cedula = ?, rif = ? WHERE id = ?';

  db.run(query, [nombre, email, telefono, direccion, cedula, rif, id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el proveedor', error: err });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor actualizado correctamente' });
  });
};

// Eliminar un proveedor
exports.deleteProveedor = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM proveedores WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el proveedor', error: err });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor eliminado correctamente' });
  });
};

