const amqp = require('amqplib');
const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel');

module.exports = async function listenForUserCreated() {
  console.log("👂 listenForUserCreated handler running...");

  const connection = await amqp.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('user_created', { durable: true });

  channel.consume('user_created', async (msg) => {
    const data = JSON.parse(msg.content.toString());
    console.log('📥 Received user_created event:', data);

    // Validar campos
    if (!data.username || !data.password) {
      console.error('⚠️ Datos incompletos en el evento, ignorado:', data);
      channel.ack(msg);
      return;
    }

    try {
      
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await createUser(data.username, hashedPassword);
      console.log(`✅ Usuario insertado en auth_db: ${data.username}`);
    } catch (err) {
      console.error('🚨 Error insertando en auth_db:', err);
    }

    channel.ack(msg);
  });
};
