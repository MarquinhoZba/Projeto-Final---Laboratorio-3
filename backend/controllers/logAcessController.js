const logModel = require('../models/logAcessModel');

exports.listarRecentes = async (req, res) => {
    try {
        const dados = await logModel.listarRecentes(50);
        
        const dadosFormatados = (dados || []).map(item => ({
            id: item.id || item.idAcesso,
            usuario: item.usuario || 'Gestor',
            dataAcesso: item.dataAcesso,
            status: item.status || 'Acesso'
        }));

        res.json(dadosFormatados);
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).json({ erro: "Erro ao buscar logs" });
    }
};

exports.buscarPorGestor = async (req, res) => {
    try {
        const { idGestor } = req.params;
        const dados = await logModel.buscarPorGestor(idGestor);
        res.json(dados || []);
    } catch (error) {
        console.error("Erro ao buscar por gestor:", error);
        res.status(500).json({ erro: "Erro ao filtrar logs" });
    }
};

exports.registrarAcesso = async (req, res) => {
    try {
        const { idGestor, acao } = req.body;
        
        if (!idGestor || !acao) {
            return res.status(400).json({ erro: "Dados incompletos" });
        }

        await logModel.registrar(idGestor, acao);
        res.status(201).json({ mensagem: "Log registrado com sucesso" });
    } catch (error) {
        console.error("Erro ao registrar log:", error);
        res.status(500).json({ erro: "Erro ao salvar log" });
    }
};