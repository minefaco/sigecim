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
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.redirect('/usuarios');
    } catch (error) {
        res.status(500).send('Error al crear usuario');
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

// IMPORTANTE: NO AGREGUES NADA MÁS AQUÍ ABAJO