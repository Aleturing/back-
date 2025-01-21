const express = require("express");
const router = express.Router();
const devolucionVentaController = require("../controllers/devolucionVentaController");

router.get("/", devolucionVentaController.getDevolucionesVenta);

router.get("/:id", devolucionVentaController.getDevolucionVentaById);

router.post("/", devolucionVentaController.createDevolucionVenta);

router.put("/:id", devolucionVentaController.updateDevolucionVenta);

router.delete("/:id", devolucionVentaController.deleteDevolucionVenta);

module.exports = router;
