// 1. CONFIGURACIÓN Y REQUERIMIENTOS
require('dotenv').config();
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const conectarDB = require('./src/config/db');

// Importamos controladores y middlewares (Pero las rutas las dejamos para después)
const authController = require('./src/controllers/authController');
const estaLogueado = require('./src/middlewares/authMiddleware');

const app = express();

// 2. CONEXIÓN A BASE DE DATOS
conectarDB();

// 3. CONFIGURACIÓN DEL MOTOR DE VISTAS (EJS)
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 4. MIDDLEWARES GLOBALES (Deben ir antes de las rutas)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secreto_sigecim_2026',
    resave: false,
    saveUninitialized: false
}));

// 5. RUTAS DE AUTENTICACIÓN (Directas)
app.get('/', authController.mostrarLogin);
app.post('/login', authController.procesarLogin);
app.get('/logout', authController.cerrarSesion);

app.get('/dashboard', estaLogueado, (req, res) => {
    res.render('index', { 
        titulo: 'Panel Principal',
        nombre: req.session.nombre,
        rol: req.session.rol
    });
});

// 6. RUTAS DE RECURSOS (Aquí importamos y usamos al mismo tiempo para evitar el undefined)
// Esto asegura que cuando se carguen las rutas, todo lo anterior ya esté inicializado.
app.use('/usuarios', require('./src/routes/UsuarioRoutes'));

// 7. ENCENDIDO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 SIGECIM ejecutándose en http://localhost:${PORT}`);
});