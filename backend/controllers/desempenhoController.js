const desempenhoModel = require('../models/desempenhoModel');

exports.listarGeral = async (req, res) => {
    try {
        const dados = await desempenhoModel.listarTodos();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao sincronizar lista" });
    }
};

exports.salvarDesempenho = async (req, res) => {
    try {
        const resultado = await desempenhoModel.registrar(req.body);
        res.status(201).json({ mensagem: "Sucesso!", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao salvar no banco" });
    }
};

exports.atualizarDesempenho = async (req, res) => {
    try {
        const { id } = req.params;
        await desempenhoModel.atualizar(id, req.body);
        res.json({ mensagem: "Atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar" });
    }
};