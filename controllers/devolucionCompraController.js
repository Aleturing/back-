const DevolucionCompra = require('../models/DevolucionCompra');

// Obtener todas las devoluciones de compra
exports.getDevolucionesCompra = (req, res, next) => {
  DevolucionCompra.obtenerTodas((err, filas) => {
    if (err) return next(err);
    res.json(filas);
  });
};

// Obtener una devolución de compra por ID
exports.getDevolucionCompraById = (req, res, next) => {
  const { id } = req.params;
  DevolucionCompra.obtenerPorId(id, (err, fila) => {
    if (err) return next(err);
    if (!fila) return res.status(404).json({ mensaje: 'Devolución de compra no encontrada' });
    res.json(fila);
  });
};

// Crear una nueva devolución de compra
exports.createDevolucionCompra = (req, res, next) => {
  const datos = req.body;
  DevolucionCompra.crear(datos, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ mensaje: 'Devolución de compra creada correctamente', id });
  });
};

// Actualizar una devolución de compra
exports.updateDevolucionCompra = (req, res, next) => {
  const { id } = req.params;
  const datos = req.body;
  DevolucionCompra.actualizar(id, datos, (err, cambios) => {
    if (err) return next(err);
    if (cambios === 0) return res.status(404).json({ mensaje: 'Devolución de compra no encontrada' });
    res.json({ mensaje: 'Devolución de compra actualizada correctamente' });
  });
};

// Eliminar una devolución de compra
exports.deleteDevolucionCompra = (req, res, next) => {
  const { id } = req.params;
  DevolucionCompra.eliminar(id, (err, cambios) => {
    if (err) return next(err);
    if (cambios === 0) return res.status(404).json({ mensaje: 'Devolución de compra no encontrada' });
    res.json({ mensaje: 'Devolución de compra eliminada correctamente' });
  });
};
