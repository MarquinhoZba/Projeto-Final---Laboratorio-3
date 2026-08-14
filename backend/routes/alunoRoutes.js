const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Define as rotas para /api/alunos
router.get('/', alunoController.listar);
router.post('/', alunoController.cadastrar);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', alunoController.deletar);

module.exports = router;