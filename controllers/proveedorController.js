const Proveedor = require('../models/Proveedor');

// Listar todos los proveedores
const getProveedores = (req, res, next) => {
  Proveedor.getAll((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Obtener un proveedor por ID
const getProveedorById = (req, res, next) => {
  const { id } = req.params;
  Proveedor.getById(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(row);
  });
};

// Crear un nuevo proveedor
const createProveedor = (req, res, next) => {
  const { nombre, email, telefono, direccion, cedula, rif } = req.body;
  const data = { nombre, email, telefono, direccion, cedula, rif };
  Proveedor.create(data, (err, insertId) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Proveedor creado correctamente', id: insertId });
  });
};

// Actualizar un proveedor existente
const updateProveedor = (req, res, next) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion, cedula, rif } = req.body;
  const data = { nombre, email, telefono, direccion, cedula, rif };

  Proveedor.update(id, data, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor actualizado correctamente' });
  });
};

// Eliminar un proveedor
const deleteProveedor = (req, res, next) => {
  const { id } = req.params;
  Proveedor.delete(id, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado correctamente' });
  });
};

module.exports = {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
};
