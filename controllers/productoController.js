const Producto = require('../models/Producto');

// Listar todos los productos
const getProductos = (req, res, next) => {
  Producto.getAll((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Obtener un producto por ID
const getProductoById = (req, res, next) => {
  const { id } = req.params;
  Producto.getById(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(row);
  });
};

// Crear un nuevo producto
const createProducto = (req, res, next) => {
  const { nombre, descripcion, precio, stock, foto } = req.body;
  const data = { nombre, descripcion, precio, stock, foto };
  Producto.create(data, (err, insertId) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Producto creado correctamente', id: insertId });
  });
};

// Actualizar un producto existente
const updateProducto = (req, res, next) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, foto } = req.body;
  const data = { nombre, descripcion, precio, stock, foto };
  Producto.update(id, data, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado correctamente' });
  });
};

// Eliminar un producto
const deleteProducto = (req, res, next) => {
  const { id } = req.params;
  Producto.delete(id, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  });
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
