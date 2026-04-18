const Usuario = require('../models/Usuario');

// 1. LISTAR USUARIOS
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.render('usuarios/index', { titulo: 'Lista de Usuarios', usuarios });
    } catch (error) {
        res.status(500).send('Error al obtener usuarios');
    }
};

// 2. FORMULARIO DE CREACIÓN
exports.formularioCrear = (req, res) => {
    res.render('usuarios/crear', { titulo: 'Nuevo Usuario' });
};

// 3. GUARDAR USUARIO
exports.guardarUsuario = async (req, res) => {
    try {
        console.log("Datos recibidos del formulario:", req.body); // Esto nos dirá qué llega al servidor
        
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        
        res.redirect('/usuarios');
    } catch (error) {
        console.error("Fallo al guardar usuario:", error);
        
        // Si el error es por un campo duplicado (como el documento o email)
        if (error.code === 11000) {
            return res.status(400).send(`Error: El ${Object.keys(error.keyValue)} ya está registrado.`);
        }
        
        // Si el error es de validación (falta un campo obligatorio)
        if (error.name === 'ValidationError') {
            return res.status(400).send(`Error de validación: ${error.message}`);
        }

        res.status(500).send('Error interno al crear usuario');
    }
};

// 4. FORMULARIO DE EDICIÓN
exports.formularioEditar = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.redirect('/usuarios');
        res.render('usuarios/editar', { titulo: 'Editar Usuario', usuario });
    } catch (error) {
        res.status(500).send('Error al buscar usuario');
    }
};

// 5. ACTUALIZAR USUARIO
exports.actualizarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/usuarios');
    } catch (error) {
        res.status(500).send('Error al actualizar');
    }
};

// 6. ELIMINAR USUARIO
exports.eliminarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.redirect('/usuarios');
    } catch (error) {
        res.status(500).send('Error al eliminar');
    }
};

// Nueva función para el módulo de paciente
exports.verPerfilPaciente = async (req, res) => {
    try {
        const paciente = await Usuario.findById(req.session.usuarioId);
        res.render('paciente/perfil', { titulo: 'Mi Perfil Médico', paciente });
    } catch (error) {
        res.status(500).send('Error al cargar el perfil');
    }
};

// Función para ver el perfil del paciente
exports.verPerfilPaciente = async (req, res) => {
    try {
        const Usuario = require('../models/Usuario');
        // Buscamos al usuario por su ID de sesión
        const paciente = await Usuario.findById(req.session.usuarioId);
        
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }

        res.render('paciente/perfil', { 
            titulo: 'Mi Ficha Médica', 
            paciente 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el perfil médico');
    }
};
// IMPORTANTE: NO AGREGUES NADA MÁS AQUÍ ABAJO