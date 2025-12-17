const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// POST /api/events/goal
router.post('/goal', eventController.createGoal);

// POST /api/events/card
router.post('/card', eventController.createCard);

// POST /api/events/substitution
router.post('/substitution', eventController.createSubstitution);

// POST /api/events/match-status
router.post('/match-status', eventController.matchStatus);

module.exports = router;
