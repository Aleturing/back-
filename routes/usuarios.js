const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');




// rutas para usuarios
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);



module.exports = router;
