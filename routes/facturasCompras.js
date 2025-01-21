const express = require("express");
const router = express.Router();
const facturaCompraController = require("../controllers/facturaCompraController");

router.get("/", facturaCompraController.getFacturasCompra);

router.get("/:id", facturaCompraController.getFacturaCompraById);

router.post("/", facturaCompraController.createFacturaCompra);

router.put("/:id", facturaCompraController.updateFacturaCompra);

router.delete("/:id", facturaCompraController.deleteFacturaCompra);

module.exports = router;
