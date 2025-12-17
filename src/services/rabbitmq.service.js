const rabbitmqConfig = require('../config/rabbitmq.config');

class RabbitMQService {
  async publishEvent(eventType, matchId, eventData) {
    try {
      const channel = rabbitmqConfig.getChannel();
      
      // Routing key: match.{matchId}.{eventType}
      const routingKey = `match.${matchId}.${eventType}`;
      
      const message = {
        timestamp: new Date().toISOString(),
        matchId,
        eventType,
        data: eventData
      };

      channel.publish(
        'mundial_events',
        routingKey,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );

      console.log(`📤 Evento publicado: ${routingKey}`, message);
      return true;
    } catch (error) {
      console.error('Error publicando evento:', error);
      throw error;
    }
  }
}

module.exports = new RabbitMQService();
