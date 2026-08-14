const Gestor = require('../models/gestorModel');
const logModel = require('../models/logAcessModel');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const gestor = await Gestor.buscarPorEmail(email);

        if (!gestor) {
            return res.status(404).json({ mensagem: "E-mail não cadastrado!" });
        }

        if (gestor.senha === senha) {
            await logModel.registrar(gestor.idGestor, `Login realizado - ${gestor.email}`);

            const { senha, ...dadosPublicos } = gestor;
            
            return res.json({ 
                mensagem: "Login realizado com sucesso!", 
                gestor: dadosPublicos,
                nomeGestor: dadosPublicos.nomeGestor, 
                idGestor: dadosPublicos.idGestor      
            });
        } else {
            return res.status(401).json({ mensagem: "Senha incorreta!" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no servidor", erro: error });
    }
};

exports.buscarPerfil = async (req, res) => {
    try {
        const gestor = await Gestor.buscarPorId(req.params.id);
        res.json(gestor);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.atualizarPerfil = async (req, res) => {
    try {
        await Gestor.atualizar(req.params.id, req.body);
        res.json({ mensagem: "Perfil atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json(error);
    }
};