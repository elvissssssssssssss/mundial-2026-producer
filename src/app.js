require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rabbitmqConfig = require('./config/rabbitmq.config');
const eventRoutes = require('./routes/event.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/events', eventRoutes);

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'Producer OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
async function startServer() {
  try {
    // Conectar RabbitMQ
    await rabbitmqConfig.connect();
    console.log('✅ RabbitMQ conectado en Producer');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Producer Backend corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando Producer:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
