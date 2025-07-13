require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const listenForUserCreated = require('./events/listenForUserCreated');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Auth service running on port ${PORT}`);
});


listenForUserCreated();
