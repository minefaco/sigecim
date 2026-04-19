const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const estaLogueado = require('../middlewares/authMiddleware');

// ==========================================
// 1. RUTAS DEL PACIENTE
// ==========================================
router.get('/agendar', estaLogueado, citaController.formularioAgendar);
router.post('/agendar', estaLogueado, citaController.guardarCita);
router.get('/mis-citas', estaLogueado, citaController.misCitas);

// ==========================================
// 2. RUTAS DEL DOCTOR
// ==========================================
// IMPORTANTE: '/doctor/agenda' debe ir ANTES de cualquier ruta con ':id'
router.get('/doctor/agenda', estaLogueado, citaController.agendaDoctor);
router.get('/atender/:id', estaLogueado, citaController.formularioAtender);
router.post('/atender/:id', estaLogueado, citaController.finalizarConsulta);

// ==========================================
// 3. RUTAS DE RECEPCIÓN / GENERAL
// ==========================================
router.get('/', estaLogueado, citaController.agendaGlobal);
router.get('/nueva', estaLogueado, citaController.formularioNuevaCitaRecepcion);
router.post('/nueva', estaLogueado, citaController.guardarCitaRecepcion);

// ==========================================
// 4. RUTAS PARAMETRIZADAS (ID)
// ==========================================
// Estas rutas siempre van al final para no interceptar las rutas fijas anteriores
router.get('/:id', estaLogueado, citaController.verDetalles);
router.put('/:id/estado', estaLogueado, citaController.cambiarEstado);

module.exports = router;