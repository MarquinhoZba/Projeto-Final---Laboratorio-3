const predicaoModel = require('../models/predicaoModel');

exports.listarTodas = async (req, res) => {
    try {
        const dados = await predicaoModel.listarTodas();
        
        const formatados = (dados || []).map(item => ({
            idPredicao: item.idPredicao, 
            nomeAluno: item.nomeAluno || 'Estudante',
            nivelRisco: item.nivelRisco || 'Baixo',
            probabilidadeEvasao: item.probabilidadeEvasao || 0,
            dataPredicao: item.dataPredicao,
            algoritmo: item.algoritmo || 'N/A'
        }));

        res.json(formatados);
    } catch (error) {
        console.error("Erro ao listar predições:", error);
        res.status(500).json({ erro: "Erro ao buscar lista de predições" });
    }
};

exports.obterPorAluno = async (req, res) => {
    try {
        const { idAluno } = req.params;
        const resultado = await predicaoModel.buscarUltimaPorAluno(idAluno);
        
        if (!resultado) {
            return res.status(404).json({ mensagem: "Nenhuma predição encontrada" });
        }
        
        res.json(resultado);
    } catch (error) {
        console.error("Erro ao obter por aluno:", error);
        res.status(500).json({ erro: "Erro ao buscar dados de predição" });
    }
};

exports.obterEstatisticas = async (req, res) => {
    try {
        const estatisticas = await predicaoModel.contarRiscos();
        res.json(estatisticas || []);
    } catch (error) {
        console.error("Erro nas estatísticas:", error);
        res.status(500).json({ erro: "Erro ao gerar estatísticas" });
    }
};

exports.salvarNovaPredicao = async (req, res) => {
    try {
        
        const { tbIdAluno, tbIdModelo, probabilidadeEvasao, nivelRisco } = req.body;
        
        if (!tbIdAluno || !tbIdModelo) {
            return res.status(400).json({ erro: "Dados incompletos: tbIdAluno e tbIdModelo são obrigatórios." });
        }

        await predicaoModel.salvarResultado({ 
            idAluno: tbIdAluno, 
            idModelo: tbIdModelo, 
            probabilidade: probabilidadeEvasao || 0, 
            resultado: nivelRisco || 'Baixo'
        });
        
        res.status(201).json({ mensagem: "Predição salva com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar predição:", error);
        res.status(500).json({ erro: "Erro ao registrar predição" });
    }
};