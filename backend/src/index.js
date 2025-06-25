const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const historyRoutes = require('./routes/medicalHistory.routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📋 Medical History Service conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 5008;
app.listen(PORT, () => {
  console.log(`📋 Medical History Service corriendo en puerto ${PORT}`);
});