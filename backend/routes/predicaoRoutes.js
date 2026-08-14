const express = require('express');
const router = express.Router();
const predicaoController = require('../controllers/predicaoController');


router.get('/', predicaoController.listarTodas);

router.get('/stats/geral', predicaoController.obterEstatisticas);

router.get('/:idAluno', predicaoController.obterPorAluno);

router.post('/', predicaoController.salvarNovaPredicao);

module.exports = router;