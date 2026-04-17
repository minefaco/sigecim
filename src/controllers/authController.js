const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

exports.mostrarLogin = (req, res) => {
    if (req.session.usuarioId) {
        return res.redirect('/dashboard');
    }
    res.render('usuarios/login', { titulo: 'Login', error: null });
};

exports.procesarLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log("Intentando login con:", email); // <-- LOG 1

    try {
        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            console.log("Usuario no encontrado"); // <-- LOG 2
            return res.render('usuarios/login', { 
                titulo: 'Login', 
                error: 'El correo electrónico no está registrado.' 
            });
        }

        const esCorrecta = await bcrypt.compare(password, usuario.password);
        console.log("¿Contraseña correcta?:", esCorrecta); // <-- LOG 3

        if (!esCorrecta) {
            return res.render('usuarios/login', { 
                titulo: 'Login', 
                error: 'Contraseña incorrecta.' 
            });
        }

        // Si llega aquí, es que todo está bien
        req.session.usuarioId = usuario._id;
        req.session.nombre = usuario.nombre;
        req.session.rol = usuario.rol;
        
        console.log("Sesión creada, redirigiendo..."); // <-- LOG 4
        
        // Forzamos el guardado de la sesión antes de redirigir
        req.session.save(() => {
            res.redirect('/dashboard');
        });

    } catch (error) {
        console.error("ERROR EN LOGIN:", error);
        res.status(500).send('Error en el servidor.');
    }
};


exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); // Al cerrar sesión, lo mandamos al login
    });
};