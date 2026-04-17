const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    rol: { 
        type: String, 
        enum: ['Admin', 'Medico', 'Paciente', 'Recepcionista'], 
        default: 'Paciente' 
    }
}, { timestamps: true }); // Esto agrega automáticamente fecha de creación y actualización

module.exports = mongoose.model('Usuario', UsuarioSchema);