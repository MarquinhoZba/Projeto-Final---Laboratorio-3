const db = require('../config/db');

const LogAcess = {
  
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  registrar: async (idGestor, acao) => {
    const sql = `
      INSERT INTO tbLogAcesso (tbIdGestor, acao, dataHora) 
      VALUES (?, ?, NOW())
    `;
    return await LogAcess.query(sql, [idGestor, acao]);
  },

  
listarRecentes: async (limite = 50) => {
    const total = Number(limite) || 50;
    
    const sql = `
      SELECT 
        l.idAcesso as id,
        COALESCE(g.nomeGestor, 'Sistema') as usuario,
        l.dataHora as dataAcesso,
        l.acao as status
      FROM tbLogAcesso l
      LEFT JOIN tbGestor g ON l.tbIdGestor = g.idGestor
      ORDER BY l.dataHora DESC
      LIMIT ?
    `;
    
    return await LogAcess.query(sql, [total]).catch(err => {
        console.error("Erro na Query SQL de Logs:", err);
        return []; 
    });
},

  buscarPorGestor: async (idGestor) => {
    const sql = `
      SELECT 
        idAcesso as id,
        dataHora as dataAcesso,
        acao as status
      FROM tbLogAcesso 
      WHERE tbIdGestor = ?
      ORDER BY dataHora DESC
    `;
    return await LogAcess.query(sql, [idGestor]);
  },

  
  limparLogsAntigos: async (dias) => {
    const sql = `
      DELETE FROM tbLogAcesso 
      WHERE dataHora < DATE_SUB(NOW(), INTERVAL ? DAY)
    `;
    return await LogAcess.query(sql, [dias]);
  }
};

module.exports = LogAcess;