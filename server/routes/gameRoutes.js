const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { auth } = require('../middleware/authMiddleware');

router.post('/games', auth, gameController.createGame);
router.get('/games/:id', auth, gameController.getGameState);
router.patch('/games/:id', auth, gameController.updateGameState);

module.exports = router;
