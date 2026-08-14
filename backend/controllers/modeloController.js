const modeloModel = require('../models/modeloModel');

exports.listarModelos = (req, res) => {
  modeloModel.listar((err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

exports.registrarModelo = (req, res) => {
  const novoModelo = req.body;
  modeloModel.inserir(novoModelo, (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao salvar modelo" });
    res.json({ mensagem: "Modelo registrado com sucesso!" });
  });
};

exports.excluirModelo = (req, res) => {
  const { id } = req.params;
  modeloModel.deletar(id, (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao excluir" });
    res.json({ mensagem: "Modelo e predições removidos!" });
  });
};