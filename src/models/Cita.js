const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
    paciente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', // Referencia al modelo de Usuario
        required: true 
    },
    medico: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    fecha: { 
        type: Date, 
        required: true 
    },
    hora: { 
        type: String, 
        required: true 
    },
    motivo: { 
        type: String, 
        required: true 
    },
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'], 
        default: 'Pendiente' 
    },
    observaciones: String, // Conservamos tu campo original
    
    // --- NUEVOS CAMPOS CLÍNICOS (Módulo Médico) ---
    diagnostico: { type: String },
    receta: { type: String },
    notasDoctor: { type: String }
    
}, { timestamps: true });

module.exports = mongoose.model('Cita', CitaSchema);