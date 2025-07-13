const amqp = require('amqplib');

async function listenForUserCreated() {
  try {
    const conn = await amqp.connect(process.env.AMQP_URL || 'amqp://rabbitmq');
    const channel = await conn.createChannel();
    const queue = 'user.created';

    await channel.assertQueue(queue, { durable: true });
    console.log(`✅ Listening for events on queue: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const user = JSON.parse(msg.content.toString());
        console.log('🔔 Received event:', user);

        // Aquí puedes hacer lógica extra
        // Ej: guardar en logs, mandar email, etc.

        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('❌ Error connecting to RabbitMQ:', err);
  }
}

module.exports = listenForUserCreated;
