const Administrador = require('../models/Administrador');

exports.getAdministradores = (req, res, next) => {
  Administrador.obtenerTodos((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

exports.getAdministradorById = (req, res, next) => {
  const { id } = req.params;
  Administrador.obtenerPorId(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: 'Administrador no encontrado' });
    res.json(row);
  });
};

exports.createAdministrador = (req, res, next) => {
  Administrador.crear(req.body, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ id });
  });
};

exports.updateAdministrador = (req, res, next) => {
  const { id } = req.params;
  Administrador.actualizar(id, req.body, (err) => {
    if (err) return next(err);
    res.json({ message: 'Administrador actualizado correctamente' });
  });
};

exports.deleteAdministrador = (req, res, next) => {
  const { id } = req.params;
  Administrador.eliminar(id, (err) => {
    if (err) return next(err);
    res.json({ message: 'Administrador eliminado correctamente' });
  });
};
