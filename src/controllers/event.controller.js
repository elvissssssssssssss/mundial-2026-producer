const rabbitmqService = require('../services/rabbitmq.service');

class EventController {
  // Simular gol
  async createGoal(req, res) {
    try {
      const { matchId, team, player, minute } = req.body;
      
      await rabbitmqService.publishEvent('goal', matchId, {
        team,
        player,
        minute,
        score: req.body.score // { home: 1, away: 0 }
      });

      res.json({ success: true, message: 'Gol registrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Simular tarjeta
  async createCard(req, res) {
    try {
      const { matchId, team, player, minute, cardType } = req.body;
      
      await rabbitmqService.publishEvent('card', matchId, {
        team,
        player,
        minute,
        cardType // 'yellow' o 'red'
      });

      res.json({ success: true, message: 'Tarjeta registrada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Cambio de jugador
  async createSubstitution(req, res) {
    try {
      const { matchId, team, playerOut, playerIn, minute } = req.body;
      
      await rabbitmqService.publishEvent('substitution', matchId, {
        team,
        playerOut,
        playerIn,
        minute
      });

      res.json({ success: true, message: 'Cambio registrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Inicio/Fin de tiempo
  async matchStatus(req, res) {
    try {
      const { matchId, status } = req.body;
      // status: 'first_half_start', 'half_time', 'second_half_start', 'full_time'
      
      await rabbitmqService.publishEvent('match_status', matchId, { status });

      res.json({ success: true, message: 'Estado actualizado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EventController();
