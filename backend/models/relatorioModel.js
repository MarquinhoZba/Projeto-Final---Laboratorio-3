const db = require('../config/db');

const Relatorio = {
  
  obterResumoPorCurso: (callback) => {
    const sql = `
      SELECT 
        curso, 
        COUNT(*) as totalAlunos,
        SUM(CASE WHEN situacao = 'Evadido' THEN 1 ELSE 0 END) as totalEvadidos,
        ROUND((SUM(CASE WHEN situacao = 'Evadido' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as taxaEvasao
      FROM tbAluno
      GROUP BY curso`;
    db.query(sql, callback);
  },

  
  obterAlunosEmRiscoCritico: (callback) => {
    const sql = `
      SELECT 
        a.nomeAluno, 
        a.matricula, 
        p.probabilidade, 
        p.resultado as statusIA
      FROM tbAluno a
      JOIN tbPredicaoEvasao p ON a.idAluno = p.idAluno
      WHERE p.resultado = 'Alto Risco'
      ORDER BY p.probabilidade DESC`;
    db.query(sql, callback);
  },

  
  relatorioDesempenhoGeral: (periodo, callback) => {
    const sql = `
      SELECT 
        anoSemestre, 
        AVG(mediaNotas) as mediaTurma, 
        AVG(frequencias) as frequenciaMedia
      FROM tbDesempenhoAcademico
      WHERE anoSemestre = ?
      GROUP BY anoSemestre`;
    db.query(sql, [periodo], callback);
  }
};

module.exports = Relatorio;