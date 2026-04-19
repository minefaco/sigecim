require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./src/models/Usuario');
const conectarDB = require('./src/config/db');

const seedDB = async () => {
    await conectarDB();

    // 1. Borrar la BD si existe para evitar duplicados o conflictos
    await Usuario.deleteMany({});
    console.log('Base de datos limpia...');

    const usuarios = [
        // ADMINISTRADOR
        {
            nombre: 'Administrador',
            apellido: 'General',
            documento: '10001',
            email: 'admin@sigecim.com',
            password: 'admin123',
            rol: 'Admin'
        },
        // DOCTORES
        {
            nombre: 'Gregory',
            apellido: 'House',
            documento: '20001',
            email: 'house@sigecim.com',
            password: 'med123',
            rol: 'Medico',
            tipoSangre: 'O+'
        },
        {
            nombre: 'Meredith',
            apellido: 'Grey',
            documento: '20002',
            email: 'grey@sigecim.com',
            password: 'med123',
            rol: 'Medico',
            tipoSangre: 'A-'
        },
        {
            nombre: 'Shaun',
            apellido: 'Murphy',
            documento: '20003',
            email: 'murphy@sigecim.com',
            password: 'med123',
            rol: 'Medico',
            tipoSangre: 'B+'
        },
        // RECEPCIONISTAS
        {
            nombre: 'Pam',
            apellido: 'Beesly',
            documento: '30001',
            email: 'pam@sigecim.com',
            password: 'recep123',
            rol: 'Recepcionista'
        },
        {
            nombre: 'Emily',
            apellido: 'Charlton',
            documento: '30002',
            email: 'emily@sigecim.com',
            password: 'recep123',
            rol: 'Recepcionista'
        },
        // PACIENTES (Con datos clínicos para tu nueva vista de Perfil)
        {
            nombre: 'Juan',
            apellido: 'Pérez',
            documento: '40001',
            email: 'juan@paciente.com',
            password: 'paci123',
            rol: 'Paciente',
            tipoSangre: 'O+',
            eps: 'Sanitas',
            alergias: ['Penicilina'],
            telefono: '3101234567'
        },
        {
            nombre: 'Maria',
            apellido: 'García',
            documento: '40002',
            email: 'maria@paciente.com',
            password: 'paci123',
            rol: 'Paciente',
            tipoSangre: 'A+',
            eps: 'Sura',
            alergias: [],
            telefono: '3209876543'
        },
        {
            nombre: 'Carlos',
            apellido: 'Ruiz',
            documento: '40003',
            email: 'carlos@paciente.com',
            password: 'paci123',
            rol: 'Paciente',
            tipoSangre: 'AB-',
            eps: 'Salud Total',
            alergias: ['Polen', 'Aspirina'],
            telefono: '3005554433'
        },
        {
            nombre: 'Ana',
            apellido: 'Martínez',
            documento: '40004',
            email: 'ana@paciente.com',
            password: 'paci123',
            rol: 'Paciente',
            tipoSangre: 'O-',
            eps: 'Compensar',
            alergias: ['Lactosa'],
            telefono: '3152223344'
        },
        {
            nombre: 'Luis',
            apellido: 'Rodríguez',
            documento: '40005',
            email: 'luis@paciente.com',
            password: 'paci123',
            rol: 'Paciente',
            tipoSangre: 'B-',
            eps: 'Nueva EPS',
            alergias: [],
            telefono: '3118889900'
        }
    ];

    // ... (dentro de la función seedDB, después de definir el array 'usuarios')

    try {
        // En lugar de insertMany, usamos un bucle para activar los middlewares (encriptación)
        for (let u of usuarios) {
            const nuevoUsuario = new Usuario(u);
            await nuevoUsuario.save();
        }

        console.log('✅ Éxito: 11 usuarios creados y contraseñas encriptadas.');
        console.log('---');
        console.log('Admin: admin@sigecim.com / admin123');
        console.log('Pacientes: paci123');
    } catch (error) {
        console.error('❌ Error al insertar usuarios:', error);
    }

    process.exit();
// ...

    process.exit();
};

seedDB();