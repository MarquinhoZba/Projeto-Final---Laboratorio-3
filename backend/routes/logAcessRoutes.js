const express = require('express');
const router = express.Router();
const logController = require('../controllers/logAcessController');

// Rota principal da tela de Logs
router.get('/recentes', logController.listarRecentes);

// Rota para filtro por gestor
router.get('/gestor/:idGestor', logController.buscarPorGestor);

// Rota para salvar um novo log
router.post('/registrar', logController.registrarAcesso);

module.exports = router;