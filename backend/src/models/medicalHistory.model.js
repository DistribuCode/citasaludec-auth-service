const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  pacienteId: { type: String, required: true },
  doctorId: { type: String },
  diagnostico: { type: String, required: true },
  tratamiento: { type: String },
  observaciones: { type: String },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);