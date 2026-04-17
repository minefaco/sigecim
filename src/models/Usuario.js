const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // <--- 1. Importa bcrypt

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        enum: ['Admin', 'Medico', 'Paciente', 'Recepcionista'], 
        default: 'Paciente' 
    }
}, { timestamps: true });

// 2. Middleware para encriptar la contraseña ANTES de guardar
UsuarioSchema.pre('save', async function(next) {
    // Si la contraseña no ha sido cambiada, saltamos este paso
    if (!this.isModified('password')) return next();
    
    // Generamos el "salt" y encriptamos
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    //next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);