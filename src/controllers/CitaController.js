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