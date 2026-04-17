const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const estaLogueado = require('../middlewares/authMiddleware');

// Verificación de emergencia en consola
console.log("Cargando rutas de usuarios...");
if (!usuarioController.listarUsuarios) {
    console.error("❌ ERROR: El controlador no cargó las funciones correctamente.");
}

// Definición de rutas
router.get('/', estaLogueado, usuarioController.listarUsuarios);
router.get('/nuevo', estaLogueado, usuarioController.formularioCrear);
router.post('/nuevo', estaLogueado, usuarioController.guardarUsuario);
router.get('/editar/:id', estaLogueado, usuarioController.formularioEditar); 
router.put('/editar/:id', estaLogueado, usuarioController.actualizarUsuario);
router.delete('/eliminar/:id', estaLogueado, usuarioController.eliminarUsuario);

// LA LÍNEA MÁS IMPORTANTE:
module.exports = router;