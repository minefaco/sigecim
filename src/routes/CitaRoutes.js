const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const estaLogueado = require('../middlewares/authMiddleware');

// 1. Ruta para ver el formulario (GET)
// Cuando el paciente entra a /citas/agendar
router.get('/agendar', estaLogueado, citaController.formularioAgendar);

// 2. Ruta para procesar el formulario (POST)
// Cuando el paciente hace clic en "Confirmar"
router.post('/agendar', estaLogueado, citaController.guardarCita);
//para que el usuario pueda ver sus citas programadas
router.get('/mis-citas', estaLogueado, citaController.misCitas);
module.exports = router;