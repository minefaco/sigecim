const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    },
    // --- CAMPOS NUEVOS PARA PACIENTES ---
    telefono: String,
    eps: String,
    tipoSangre: String,
    alergias: { type: [String], default: [] },
    contactoEmergencia: {
        nombre: String,
        telefono: String
    }
}, { timestamps: true });

UsuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    //next();
});

module.exports = mongoose.model('Usuario', UsuarioSchema);