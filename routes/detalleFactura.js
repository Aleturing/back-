const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detalleFacturaController');


router.get('/', detalleFacturaController.getDetallesFactura);


router.get('/:id', detalleFacturaController.getDetalleFacturaById);


router.post('/', detalleFacturaController.createDetalleFactura);


router.put('/:id', detalleFacturaController.updateDetalleFactura);


router.delete('/:id', detalleFacturaController.deleteDetalleFactura);

module.exports = router;
