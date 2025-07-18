require('dotenv').config();
const express = require('express');
const cors = require('./middlewares/cors'); // ✅ si tienes el archivo custom
// const cors = require('cors'); // ✅ o usa esta línea si prefieres directamente

const authRoutes = require('./routes/authRoutes');
const listenForUserCreated = require('./events/listenForUserCreated');

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ AQUI aplica el middleware CORS
app.use(cors);

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});

listenForUserCreated();
