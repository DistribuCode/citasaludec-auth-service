const MedicalHistory = require('../models/medicalHistory.model');

exports.crearHistorial = async (req, res) => {
  try {
    const nuevo = new MedicalHistory(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerHistoriales = async (req, res) => {
  try {
    const historiales = await MedicalHistory.find();
    res.status(200).json(historiales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};