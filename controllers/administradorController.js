const AdministradorController = require("../models/Administrador");

/** POST /api/administradores */
exports.createAdministrador = (req, res, next) => {
  AdministradorController.crear(req.body, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Administrador creado correctamente', id });
  });
};

/** GET /api/administradores */
exports.getAdministradores = (req, res, next) => {
  AdministradorController.obtenerTodos((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

/** GET /api/administradores/:id */
exports.getAdministradorById = (req, res, next) => {
  const { id } = req.params;
  AdministradorController.obtenerPorId(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: 'Administrador no encontrado' });
    res.json(row);
  });
};

/** PUT /api/administradores/:id */
exports.updateAdministrador = (req, res, next) => {
  const { id } = req.params;
  AdministradorController.actualizar(id, req.body, (err, affectedRows) => {
    if (err) return next(err);
    if (affectedRows === 0) return res.status(404).json({ message: 'Administrador no encontrado' });
    res.json({ message: 'Administrador actualizado correctamente' });
  });
};

/** DELETE /api/administradores/:id */
exports.deleteAdministrador = (req, res, next) => {
  const { id } = req.params;
  AdministradorController.eliminar(id, (err, deleted) => {
    if (err) return next(err);
    if (deleted === 0) return res.status(404).json({ message: 'Administrador no encontrado' });
    res.json({ message: 'Administrador eliminado correctamente' });
  });
};
