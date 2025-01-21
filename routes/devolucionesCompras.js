const express = require("express");
const router = express.Router();
const devolucionCompraController = require("../controllers/devolucionCompraController");

router.get("/", devolucionCompraController.getDevolucionesCompra);

router.get("/:id", devolucionCompraController.getDevolucionCompraById);

router.post("/", devolucionCompraController.createDevolucionCompra);

router.put("/:id", devolucionCompraController.updateDevolucionCompra);

router.delete("/:id", devolucionCompraController.deleteDevolucionCompra);

module.exports = router;
