const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadoresController');

router.get('/', jugadoresController.getJugadores);

router.get('/:id', jugadoresController.getJugadorById);

router.put('/:id', jugadoresController.updateJugador);

router.post('/', jugadoresController.createJugador);

router.get('/export-csv', jugadoresController.exportJugadores);

module.exports = router;