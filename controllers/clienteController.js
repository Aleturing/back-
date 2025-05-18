const Cliente = require("../models/Cliente");

exports.getClientes = (req, res, next) => {
  Cliente.obtenerTodos((err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
};

exports.getClienteById = (req, res, next) => {
  const { id } = req.params;
  Cliente.obtenerPorId(id, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(row);
  });
};

exports.getClienteByCi = (req, res, next) => {
  const { cedula } = req.params;
  Cliente.obtenerPorCi(cedula, (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(row);
  });
};

exports.createCliente = (req, res, next) => {
  Cliente.crear(req.body, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ id });
  });
};

exports.updateCliente = (req, res, next) => {
  const { id } = req.params;
  Cliente.actualizar(id, req.body, (err) => {
    if (err) return next(err);
    res.json({ message: "Cliente actualizado correctamente" });
  });
};

exports.deleteCliente = (req, res, next) => {
  const { id } = req.params;
  Cliente.eliminar(id, (err) => {
    if (err) return next(err);
    res.json({ message: "Cliente eliminado correctamente" });
  });
};
