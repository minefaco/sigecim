const Cita = require('../models/Cita');
const Usuario = require('../models/Usuario');

// 1. Mostrar el formulario para agendar
exports.formularioAgendar = async (req, res) => {
    try {
        // Buscamos solo usuarios cuyo rol sea 'Medico'
        const medicos = await Usuario.find({ rol: 'Medico' });
        
        res.render('paciente/agendar-cita', { 
            titulo: 'Agendar Cita', 
            medicos 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la lista de médicos');
    }
};

// 2. Procesar y guardar la cita
exports.guardarCita = async (req, res) => {
    try {
        const { medico, fecha, hora, motivo } = req.body;
        
        const nuevaCita = new Cita({
            paciente: req.session.usuarioId, // Lo tomamos de la sesión actual
            medico,
            fecha,
            hora,
            motivo
        });

        await nuevaCita.save();
        
        // Por ahora, redirigimos al dashboard tras el éxito
        res.redirect('/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la cita médica');
    }
};

// Ver las citas del paciente logueado
exports.misCitas = async (req, res) => {
    try {
        const Cita = require('../models/Cita');
        
        // Buscamos citas del paciente y "traemos" los datos del médico
        const citas = await Cita.find({ paciente: req.session.usuarioId })
                                .populate('medico')
                                .sort({ fecha: 1 }); // Ordenadas por fecha cercana

        res.render('paciente/mis-citas', { 
            titulo: 'Mis Citas Médicas', 
            citas 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar tus citas');
    }
};

// Ver TODAS las citas (Para Recepcionistas y Admins)
exports.agendaGlobal = async (req, res) => {
    try {
        // Validación de seguridad extra: Solo Recepcionista o Admin
        if (req.session.rol !== 'Recepcionista' && req.session.rol !== 'Admin') {
            return res.status(403).send('Acceso denegado. Solo personal autorizado.');
        }

        const Cita = require('../models/Cita');
        
        // Traemos TODAS las citas y cruzamos datos con pacientes y médicos
        const citas = await Cita.find()
                                .populate('paciente')
                                .populate('medico')
                                .sort({ fecha: 1, hora: 1 }); // Ordenadas por fecha y hora

        res.render('recepcion/agenda', { 
            titulo: 'Agenda de Turnos', 
            citas 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la agenda global');
    }
};

// Cambiar el estado de una cita (Confirmar / Cancelar)
exports.cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;          // Capturamos el ID de la URL
        const { nuevoEstado } = req.body;   // Capturamos el estado del formulario

        const Cita = require('../models/Cita');
        
        // Buscamos la cita por ID y le actualizamos solo el campo 'estado'
        await Cita.findByIdAndUpdate(id, { estado: nuevoEstado });

        // Redirigimos de vuelta a la agenda para ver el cambio instantáneo
        res.redirect('/citas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el estado de la cita');
    }
};

// Mostrar formulario de nueva cita (Solo Recepción/Admin)
exports.formularioNuevaCitaRecepcion = async (req, res) => {
    try {
        if (req.session.rol !== 'Recepcionista' && req.session.rol !== 'Admin') {
            return res.status(403).send('Acceso denegado.');
        }

        const Usuario = require('../models/Usuario');
        
        // Traemos tanto a los pacientes como a los médicos, ordenados alfabéticamente
        const pacientes = await Usuario.find({ rol: 'Paciente' }).sort({ nombre: 1 });
        const medicos = await Usuario.find({ rol: 'Medico' }).sort({ nombre: 1 });

        res.render('recepcion/nueva-cita', { 
            titulo: 'Asignar Turno Manual', 
            pacientes, 
            medicos 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};

// Procesar y guardar la cita desde Recepción
exports.guardarCitaRecepcion = async (req, res) => {
    try {
        const Cita = require('../models/Cita');
        const { paciente, medico, fecha, hora, motivo } = req.body;
        
        const nuevaCita = new Cita({
            paciente, // El ID viene del select del formulario
            medico,
            fecha,
            hora,
            motivo,
            estado: 'Confirmada' // Se confirma automáticamente
        });

        await nuevaCita.save();
        
        // Redirigimos a la agenda global para verla de inmediato
        res.redirect('/citas'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la cita médica');
    }
};

// Ver detalles completos de una cita
exports.verDetalles = async (req, res) => {
    try {
        const Cita = require('../models/Cita');
        const { id } = req.params; // Capturamos el ID de la URL
        
        // Buscamos la cita y cruzamos los datos (.populate)
        const cita = await Cita.findById(id)
                               .populate('paciente')
                               .populate('medico');

        // Si alguien pone un ID inventado en la URL, mostramos el 404
        if (!cita) {
            return res.status(404).render('404', { titulo: 'Cita no encontrada' });
        }

        res.render('recepcion/detalle-cita', { 
            titulo: 'Detalles del Turno', 
            cita 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los detalles de la cita');
    }
};

// 1. Ver agenda propia del médico
exports.agendaDoctor = async (req, res) => {
    try {
        const Cita = require('../models/Cita');
        // Filtramos: solo citas de este médico que estén 'Confirmadas'
        const citas = await Cita.find({ 
            medico: req.session.usuarioId,
            estado: 'Confirmada' 
        }).populate('paciente').sort({ fecha: 1, hora: 1 });

        res.render('doctor/agenda', { titulo: 'Mi Agenda Médica', citas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la agenda');
    }
};

// 2. Mostrar formulario para atender la cita
exports.formularioAtender = async (req, res) => {
    try {
        const Cita = require('../models/Cita');
        const cita = await Cita.findById(req.params.id).populate('paciente');
        
        res.render('doctor/atender', { titulo: 'Consulta Médica', cita });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al abrir la consulta');
    }
};

// 3. Guardar diagnóstico y finalizar cita
exports.finalizarConsulta = async (req, res) => {
    try {
        const Cita = require('../models/Cita');
        const { diagnostico, receta, notasDoctor } = req.body;

        await Cita.findByIdAndUpdate(req.params.id, {
            diagnostico,
            receta,
            notasDoctor,
            estado: 'Completada' // La cita pasa de Confirmada a Completada
        });

        res.redirect('/citas/doctor/agenda');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la consulta');
    }
};