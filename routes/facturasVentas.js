const express = require("express");
const router = express.Router();
const facturaVentaController = require("../controllers/facturaVentaController");

router.get("/", facturaVentaController.getFacturasVenta);

router.get('/ultimo-numero', facturaVentaController.getUltimoNumeroFactura);

router.get("/:id", facturaVentaController.getFacturaVentaById);

router.post("/", facturaVentaController.createFacturaVenta);

router.put("/:id", facturaVentaController.updateFacturaVenta);

router.delete("/:id", facturaVentaController.deleteFacturaVenta);


module.exports = router;
