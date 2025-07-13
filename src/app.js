const amqp = require('amqplib');

async function listenForUserCreated() {
  try {
    const amqpUrl = process.env.AMQP_URL || 'amqp://localhost';
    console.log(`🚀 Connecting to RabbitMQ at ${amqpUrl}`);

    const conn = await amqp.connect(amqpUrl);
    const channel = await conn.createChannel();
    const queue = 'user.created';

    await channel.assertQueue(queue, { durable: true });
    console.log(`✅ Listening for events on queue: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        try {
          const user = JSON.parse(msg.content.toString());
          console.log('🔔 Received event:', user);

          // Aquí puedes hacer lógica extra
          // Ej: guardar en logs, mandar email, actualizar cache, etc.

          channel.ack(msg);
        } catch (parseErr) {
          console.error('⚠️ Error parsing message:', parseErr);
          channel.nack(msg, false, false); // descartar el mensaje
        }
      }
    });
  } catch (err) {
    console.error('❌ Error connecting or consuming from RabbitMQ:', err);
  }
}

module.exports = listenForUserCreated;
