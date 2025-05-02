const FacturaCompra = require('../models/FacturaCompra');

// Obtener todas las facturas de compra
exports.getFacturasCompra = (req, res, next) => {
  FacturaCompra.obtenerTodas((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Obtener una factura de compra por ID
exports.getFacturaCompraById = (req, res, next) => {
  const { id } = req.params;
  FacturaCompra.obtenerPorId(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ mensaje: 'Factura de compra no encontrada' });
    res.json(row);
  });
};

// Crear una nueva factura de compra
exports.createFacturaCompra = (req, res, next) => {
  const datos = req.body;
  FacturaCompra.crear(datos, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ mensaje: 'Factura de compra creada', id });
  });
};

// Actualizar una factura de compra
exports.updateFacturaCompra = (req, res, next) => {
  const { id } = req.params;
  const datos = req.body;
  FacturaCompra.actualizar(id, datos, (err, cambios) => {
    if (err) return next(err);
    if (cambios === 0) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    res.json({ mensaje: 'Factura de compra actualizada' });
  });
};

// Eliminar una factura de compra
exports.deleteFacturaCompra = (req, res, next) => {
  const { id } = req.params;
  FacturaCompra.eliminar(id, (err, cambios) => {
    if (err) return next(err);
    if (cambios === 0) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    res.json({ mensaje: 'Factura de compra eliminada' });
  });
};
