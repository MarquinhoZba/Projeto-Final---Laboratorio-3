const alunoModel = require('../models/alunoModel');

exports.listar = async (req, res) => {
    try {
        const alunos = await alunoModel.listar();
        res.json(alunos);
    }catch (error) {
        res.status(500).json(error);
    }
};

exports.cadastrar = async (req, res) => {
    try {
        await alunoModel.cadastrar(req.body);
        res.json({ mensagem: "Aluno salvo no banco"});
    }catch (error) {
        res.status(500).json(error);
    }
};

exports.deletar = async (req, res) => {
    const { id } = req.params;
    await alunoModel.deletar(id);
    res.json({ mensagem: "Aluno deletado!"}); 
};

exports.atualizar = async (req, res) => {
    const { id } = req.params;
    await alunoModel.atualizar(id, req.body);
    res.json({ mensagem: "Aluno atualizado!"});
};