const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');

router.get('/', modeloController.listarModelos);
router.post('/', modeloController.registrarModelo);
router.delete('/:id', modeloController.excluirModelo);

module.exports = router;