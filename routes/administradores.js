const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/administradorController");

router.get("/", administradorController.getAdministradores);

router.get("/:id", administradorController.getAdministradorById);

router.post("/", administradorController.createAdministrador);

router.put("/:id", administradorController.updateAdministrador);

router.delete("/:id", administradorController.deleteAdministrador);

module.exports = router;
