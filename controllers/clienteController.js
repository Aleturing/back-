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

exports.getClienteByCi((req, res, next) => {
  const { cedula } = req.params;

  const query = "SELECT * FROM clientes WHERE cedula = ?";
  db.query(query, [cedula], (err, results) => {
    if (err) {
      console.error("Error al buscar cliente por cédula:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(results[0]);
  });
});
