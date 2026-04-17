const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// URL: /usuarios
router.get('/', usuarioController.listarUsuarios);

// URL: /usuarios/nuevo
router.get('/nuevo', usuarioController.formularioCrear);
router.post('/nuevo', usuarioController.guardarUsuario);

module.exports = router;