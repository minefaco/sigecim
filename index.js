// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const conectarDB = require('./src/config/db');

const app = express();

// Conectar a la base de datos
conectarDB();

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('SIGECIM: Servidor y Base de Datos conectados');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});

// ... otras importaciones
const usuarioRoutes = require('./src/routes/usuarioRoutes');

// ... después de los middlewares
app.use('/usuarios', usuarioRoutes);