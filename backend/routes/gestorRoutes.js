const express = require('express');
const router = express.Router();
const gestorController = require('../controllers/gestorController');

// Define as rotas para /api/gestores

// Rota para o processo de login
router.post('/login', gestorController.login);


// Rota para buscar os dados do perfil (usado na tela dadosGestoresSrc)
router.get('/:id', gestorController.buscarPerfil);

// Rota para atualizar informações do gestor (nome, cargo, departamento)
router.put('/:id', gestorController.atualizarPerfil);

module.exports = router;