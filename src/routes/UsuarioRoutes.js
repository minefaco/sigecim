const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const estaLogueado = require('../middlewares/authMiddleware');

// --- RUTAS DE ADMINISTRACIÓN (Las que ya tenías) ---
router.get('/', estaLogueado, usuarioController.listarUsuarios);
router.get('/nuevo', estaLogueado, usuarioController.formularioCrear);
router.post('/nuevo', estaLogueado, usuarioController.guardarUsuario);
router.get('/editar/:id', estaLogueado, usuarioController.formularioEditar); 
router.put('/editar/:id', estaLogueado, usuarioController.actualizarUsuario);
router.delete('/eliminar/:id', estaLogueado, usuarioController.eliminarUsuario);

// --- RUTAS DE PACIENTE (NUEVAS) ---
// El paciente solo puede ver SU PROPIO perfil
router.get('/perfil', estaLogueado, usuarioController.verPerfilPaciente);

module.exports = router;