const DevolucionVenta = require('../models/DevolucionVenta');

// Obtener todas las devoluciones de venta
exports.getDevolucionesVenta = (req, res, next) => {
  DevolucionVenta.obtenerTodas((err, filas) => {
    if (err) return next(err);
    res.json(filas);
  });
};

// Obtener una devolución de venta por ID
exports.getDevolucionVentaById = (req, res, next) => {
  const { id } = req.params;
  DevolucionVenta.obtenerPorId(id, (err, fila) => {
    if (err) return next(err);
    if (!fila) return res.status(404).json({ mensaje: 'Devolución de venta no encontrada' });
    res.json(fila);
  });
};

// Crear una nueva devolución de venta
exports.createDevolucionVenta = (req, res, next) => {
  const datos = req.body;
  DevolucionVenta.crear(datos, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ mensaje: 'Devolución de venta creada correctamente', id });
  });
};

// Actualizar una devolución de venta
exports.updateDevolucionVenta = (req, res, next) => {
  const { id } = req.params;
  const datos = req.body;
  DevolucionVenta.actualizar(id, datos, (err, cambios) => {
    if (err) return next(err);
    if (cambios === 0) return res.status(404).json({ mensaje: 'Devolución de venta no encontrada' });
    res.json({ mensaje: 'Devolución de venta actualizada correctamente' });
  });
};

// Eliminar una devolución de venta
exports.deleteDevolucionVenta = (req, res, next) => {
  const { id } = req.params;
  DevolucionVenta.eliminar(id, (err, cambios) => {
    if (err) return next(err);
    if (cambios === 0) return res.status(404).json({ mensaje: 'Devolución de venta no encontrada' });
    res.json({ mensaje: 'Devolución de venta eliminada correctamente' });
  });
};
