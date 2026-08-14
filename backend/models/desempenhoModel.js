const db = require('../config/db');

const Desempenho = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  listarTodos: async () => {
    const sql = `
      SELECT 
        d.idDesempenho, 
        a.nomeAluno, 
        d.mediaNotas, 
        d.frequencias, 
        d.qtdReprovacao, 
        d.participacaoAtvd, 
        d.anoSemestre
      FROM tbDesempenhoAcademico d
      INNER JOIN tbAluno a ON d.tbIdAluno = a.idAluno
      ORDER BY d.anoSemestre DESC`;
    return await Desempenho.query(sql);
  },

  registrar: async (dados) => {
    const sql = `
      INSERT INTO tbDesempenhoAcademico 
      (tbIdAluno, mediaNotas, frequencias, qtdReprovacao, participacaoAtvd, anoSemestre) 
      VALUES (?, ?, ?, ?, ?, ?)`;
    return await Desempenho.query(sql, [
      dados.tbIdAluno, 
      dados.mediaNotas, 
      dados.frequencias, 
      dados.qtdReprovacao, 
      dados.participacaoAtvd, 
      dados.anoSemestre
    ]);
  },

  atualizar: async (id, dados) => {
    const sql = `
      UPDATE tbDesempenhoAcademico SET 
        tbIdAluno=?, mediaNotas=?, frequencias=?, 
        qtdReprovacao=?, participacaoAtvd=?, anoSemestre=? 
      WHERE idDesempenho=?`;
    return await Desempenho.query(sql, [
      dados.tbIdAluno, dados.mediaNotas, dados.frequencias, 
      dados.qtdReprovacao, dados.participacaoAtvd, dados.anoSemestre, id
    ]);
  }
};

module.exports = Desempenho;