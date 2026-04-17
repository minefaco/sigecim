const Usuario = require('../models/Usuario');

// Mostrar todos los usuarios
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.render('usuarios/index', { titulo: 'Lista de Usuarios', usuarios });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Formulario para crear usuario
exports.formularioCrear = (req, res) => {
    res.render('usuarios/crear', { titulo: 'Nuevo Usuario' });
};

// Guardar el usuario en la DB
exports.guardarUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.redirect('/usuarios');
    } catch (error) {
        console.log(error);
        res.render('usuarios/crear', { titulo: 'Nuevo Usuario', error: 'Error al guardar' });
    }
};