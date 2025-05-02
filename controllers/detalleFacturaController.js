const DetalleFactura = require('../models/DetalleFactura');

// Obtener todos los detalles de facturas
exports.getDetallesFactura = (req, res, next) => {
  DetalleFactura.obtenerTodos((err, filas) => {
    if (err) return next(err);
    res.json(filas);
  });
};

// Obtener un detalle por ID
exports.getDetalleFacturaById = (req, res, next) => {
  const { id } = req.params;
  DetalleFactura.obtenerPorId(id, (err, fila) => {
    if (err) return next(err);
    if (!fila) return res.status(404).json({ message: 'Detalle de factura no encontrado' });
    res.json(fila);
  });
};

// Crear un nuevo detalle
exports.createDetalleFactura = (req, res, next) => {
  DetalleFactura.crear(req.body, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ id });
  });
};

// Actualizar un detalle
exports.updateDetalleFactura = (req, res, next) => {
  const { id } = req.params;
  DetalleFactura.actualizar(id, req.body, (err) => {
    if (err) return next(err);
    res.json({ message: 'Detalle de factura actualizado correctamente' });
  });
};

// Eliminar un detalle
exports.deleteDetalleFactura = (req, res, next) => {
  const { id } = req.params;
  DetalleFactura.eliminar(id, (err) => {
    if (err) return next(err);
    res.json({ message: 'Detalle de factura eliminado correctamente' });
  });
};
