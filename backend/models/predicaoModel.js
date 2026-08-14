const db = require('../config/db');

const Predicao = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  salvarResultado: async (dados) => {
    const sql = `
      INSERT INTO tbPredicaoEvasao 
      (tbIdAluno, tbIdModelo, probabilidadeEvasao, nivelRisco, dataPredicao) 
      VALUES (?, ?, ?, ?, NOW())
    `;
    return await Predicao.query(sql, [
      dados.tbIdAluno, 
      dados.tbIdModelo || 1, 
      dados.probabilidadeEvasao, 
      dados.nivelRisco
    ]);
  },

  buscarUltimaPorAluno: async (idAluno) => {
    const sql = "SELECT * FROM tbPredicaoEvasao WHERE tbIdAluno = ? ORDER BY dataPredicao DESC LIMIT 1";
    const rows = await Predicao.query(sql, [idAluno]);
    return rows[0]; 
  },

  contarRiscos: async () => {
    const sql = 'SELECT nivelRisco as resultado, COUNT(*) as total FROM tbPredicaoEvasao GROUP BY nivelRisco';
    return await Predicao.query(sql);
  },

  listarTodas: async () => {
    const sql = `
      SELECT 
        p.idPredicao,
        p.tbIdAluno,
        p.tbIdModelo,
        p.probabilidadeEvasao,
        p.nivelRisco,
        p.dataPredicao,
        a.nomeAluno,
        m.algoritmo
      FROM tbPredicaoEvasao p
      INNER JOIN tbAluno a ON p.tbIdAluno = a.idAluno
      INNER JOIN tbModeloPreditivo m ON p.tbIdModelo = m.idModelo
      ORDER BY p.dataPredicao DESC
    `;
    
    try {
        return await Predicao.query(sql);
    } catch (err) {
        console.error("ERRO NO SQL DE PREDIÇÃO (PEE):", err.message);
        throw err;
    }
  }
};

module.exports = Predicao;