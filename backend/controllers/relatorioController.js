const Relatorio = require('../models/relatorioModel');
const db = require('../config/db'); 


exports.obterResumoCursos = (req, res) => {
    Relatorio.obterResumoPorCurso((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.listarRiscoCritico = (req, res) => {
    Relatorio.obterAlunosEmRiscoCritico((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.obterDesempenhoGeral = (req, res) => {
    const { periodo } = req.params;
    Relatorio.relatorioDesempenhoGeral(periodo, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.gerarRelatorio = async (req, res) => {
    const { nivelRisco, busca } = req.query;

    let sql = `
        SELECT 
            a.nomeAluno, a.matricula, a.curso, a.situacao,
            d.anoSemestre, d.mediaNotas, d.frequencias, d.qtdReprovacao, d.participacaoAtvd,
            p.probabilidadeEvasao, p.nivelRisco
        FROM tbAluno a
        INNER JOIN tbDesempenhoAcademico d ON d.tbIdAluno = a.idAluno
        LEFT JOIN tbPredicaoEvasao p ON p.tbIdAluno = a.idAluno
            AND p.dataPredicao = (
                SELECT MAX(p2.dataPredicao)
                FROM tbPredicaoEvasao p2
                WHERE p2.tbIdAluno = a.idAluno
            )
        WHERE 1 = 1
    `;

    const params = [];

    if (nivelRisco && nivelRisco !== '' && nivelRisco !== 'Todos') {
        sql += " AND p.nivelRisco = ? ";
        params.push(nivelRisco);
    }

    if (busca && busca !== '') {
        sql += " AND a.nomeAluno LIKE ? ";
        params.push(`%${busca}%`);
    }

    sql += " ORDER BY a.nomeAluno ";

    try {
        db.query(sql, params, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } catch (error) {
        console.error("Erro ao processar relatório:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};

exports.exportarPDF = (req, res) => {
   
    res.setHeader('Content-Type', 'application/pdf');
    res.send("Funcionalidade de PDF sendo processada no servidor...");
};


exports.exportarExcel = (req, res) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send("Funcionalidade de Excel sendo processada no servidor...");
};


exports.listarLogs = (req, res) => {
  
    db.query("SELECT * FROM tbLogAcesso ORDER BY dataAcesso DESC LIMIT 50", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};