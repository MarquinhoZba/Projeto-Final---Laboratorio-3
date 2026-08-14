const express = require('express');
const router = express.Router();
const desempenhoController = require('../controllers/desempenhoController');

router.get('/', desempenhoController.listarGeral);

router.post('/', desempenhoController.salvarDesempenho);

router.put('/:id', desempenhoController.atualizarDesempenho);

module.exports = router;