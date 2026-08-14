const db = require('../config/db');

const getDashboardResumo = async (req, res) => {
    try {
        const query = (sql, params) => {
            return new Promise((resolve, reject) => {
                db.query(sql, params, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });
        };

        const idGestor = req.query.idGestor || null;

        let nomeGestor = '';
        if (idGestor) {
            const gestor = await query(
                'SELECT nomeGestor FROM tbGestor WHERE idGestor = ?',
                [idGestor]
            ).catch(() => []);
            nomeGestor = gestor[0]?.nomeGestor || '';
        }

        const alunos = await query('SELECT COUNT(*) as total FROM tbAluno')
            .catch(() => [{ total: 0 }]);

        const risco = await query(`
            SELECT 
                COUNT(*) as totalGeral,
                SUM(CASE WHEN nivelRisco = 'Alto'  THEN 1 ELSE 0 END) as alto,
                SUM(CASE WHEN nivelRisco = 'Medio' THEN 1 ELSE 0 END) as medio,
                SUM(CASE WHEN nivelRisco = 'Baixo' THEN 1 ELSE 0 END) as baixo
            FROM tbPredicaoEvasao
        `).catch(() => [{ totalGeral: 0, alto: 0, medio: 0, baixo: 0 }]);

        const modelos = await query('SELECT COUNT(*) as total FROM tbModeloPreditivo')
            .catch(() => [{ total: 0 }]);

        return res.json({
            nomeGestor,                                   
            totalAlunos:     alunos[0]?.total      || 0,
            alunosRiscoAlto: risco[0]?.alto        || 0,
            totalModelos:    modelos[0]?.total     || 0,
            totalPredicoes:  risco[0]?.totalGeral  || 0,
            riscoBaixo:      risco[0]?.baixo       || 0,
            riscoMedio:      risco[0]?.medio       || 0,
            riscoAlto:       risco[0]?.alto        || 0,
        });

    } catch (error) {
        console.error("ERRO NO DASHBOARD:", error);
        return res.status(500).json({ erro: "Erro interno ao processar dados do dashboard" });
    }
};

module.exports = { getDashboardResumo };