const FacturaVenta = require('../models/FacturaVenta');

// Listar todas las facturas de venta
const getFacturasVenta = (req, res, next) => {
  FacturaVenta.getAll((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

// Obtener una factura de venta por ID
const getFacturaVentaById = (req, res, next) => {
  const { id } = req.params;
  FacturaVenta.getById(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: 'Factura de venta no encontrada' });
    res.json(row);
  });
};

// Crear una nueva factura de venta
const createFacturaVenta = (req, res, next) => {
  const data = req.body;
  FacturaVenta.create(data, (err, insertId) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Factura de venta creada correctamente', id: insertId });
  });
};

// Actualizar una factura de venta existente
const updateFacturaVenta = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  FacturaVenta.update(id, data, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Factura de venta no encontrada' });
    res.json({ message: 'Factura de venta actualizada correctamente' });
  });
};

// Eliminar una factura de venta
const deleteFacturaVenta = (req, res, next) => {
  const { id } = req.params;
  FacturaVenta.delete(id, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Factura de venta no encontrada' });
    res.json({ message: 'Factura de venta eliminada correctamente' });
  });
};

// Obtener el siguiente número de factura (max ID + 1)
const getUltimoNumeroFactura = (req, res, next) => {
  FacturaVenta.getAll((err, rows) => {
    if (err) return next(err);
    if (!rows || rows.length === 0) return res.json({ ultimo_numero_factura: 1 });
    const maxId = rows.reduce((max, row) => (row.id > max ? row.id : max), 0);
    res.json({ ultimo_numero_factura: maxId + 1 });
  });
};

module.exports = {
  getFacturasVenta,
  getFacturaVentaById,
  createFacturaVenta,
  updateFacturaVenta,
  deleteFacturaVenta,
  getUltimoNumeroFactura
};