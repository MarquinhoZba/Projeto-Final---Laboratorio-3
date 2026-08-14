const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Rota para o resumo estatístico por curso (Taxas de Evasão)
router.get('/resumo-cursos', relatorioController.obterResumoCursos);

// Rota para listar alunos que a IA classificou como Risco Crítico
router.get('/risco-critico', relatorioController.listarRiscoCritico);

// Rota para o relatório de desempenho consolidado por período
router.get('/desempenho/:periodo', relatorioController.obterDesempenhoGeral);

router.get('/pdf', relatorioController.exportarPDF);

router.get('/excel', relatorioController.exportarExcel);

router.get('/', relatorioController.gerarRelatorio);

module.exports = router;