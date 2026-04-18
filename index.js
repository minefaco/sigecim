// 1. CONFIGURACIÓN Y REQUERIMIENTOS
require('dotenv').config();
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const conectarDB = require('./src/config/db');

// Importamos controladores y middlewares
const authController = require('./src/controllers/authController');
const estaLogueado = require('./src/middlewares/authMiddleware');

const app = express();

// 2. CONEXIÓN A BASE DE DATOS
conectarDB();

// 3. CONFIGURACIÓN DEL MOTOR DE VISTAS (EJS)
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 4. MIDDLEWARES GLOBALES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secreto_sigecim_2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambiar a true si usas HTTPS en el futuro
}));

// Middleware para pasar datos de sesión a todas las vistas automáticamente (LOCALES)
app.use((req, res, next) => {
    res.locals.nombre = req.session.nombre || null;
    res.locals.rol = req.session.rol || null;
    res.locals.usuarioId = req.session.usuarioId || null;
    next();
});

// 5. RUTAS DE AUTENTICACIÓN
app.get('/', authController.mostrarLogin);
app.post('/login', authController.procesarLogin);
app.get('/logout', authController.cerrarSesion);

// 6. DASHBOARD UNIVERSAL (Renderiza la vista inteligente con condicionales)
app.get('/dashboard', estaLogueado, (req, res) => {
    res.render('dashboard', { 
        titulo: 'Panel Principal'
        // No hace falta pasar nombre y rol, res.locals ya los tiene
    });
});

// 7. RUTAS DE RECURSOS (Módulos del Sistema)
app.use('/usuarios', require('./src/routes/UsuarioRoutes'));

//  RUTA DE LAS CITAS DE USUARIO:
app.use('/citas', require('./src/routes/CitaRoutes'));


// 8. MANEJO DE ERRORES 404 NO PONER MAS COSAS DEBAJO
app.use((req, res) => {
    res.status(404).render('404', { titulo: 'Página no encontrada' });
});

// 9. ENCENDIDO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SIGECIM ejecutándose en http://localhost:${PORT}`);
});