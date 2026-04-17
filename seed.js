require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./src/models/Usuario');
const conectarDB = require('./src/config/db');

const crearPrimerAdmin = async () => {
    await conectarDB();

    // LIMPIEZA: Borramos los intentos anteriores para no tener basura
    await Usuario.deleteMany({ email: 'admin@sigecim.com' });
    console.log('🧹 Limpieza completada...');

    const admin = new Usuario({
        nombre: 'Administrador',
        apellido: 'General',
        documento: '10001',
        email: 'admin@sigecim.com',
        password: 'admin123', // El modelo DEBE tener el bcrypt.hash activado
        rol: 'Admin'
    });

    await admin.save();
    console.log('Nuevo Administrador creado: admin@sigecim.com / admin123');

    process.exit();
};

crearPrimerAdmin();