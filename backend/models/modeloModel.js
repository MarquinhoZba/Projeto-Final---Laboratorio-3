const db = require('../config/db');

const Modelo = {
  
  listar: (callback) => {
    const sql = "SELECT * FROM tbModeloPreditivo ORDER BY dataTreinamento DESC";
    db.query(sql, callback);
  },

  
  inserir: (dados, callback) => {
    const sql = "INSERT INTO tbModeloPreditivo (algoritmo, dataTreinamento, acuracia, descricao) VALUES (?, ?, ?, ?)";
    db.query(sql, [dados.algoritmo, dados.dataTreinamento, dados.acuracia, dados.descricao], callback);
  },

  
  buscarPorId: (id, callback) => {
    const sql = "SELECT * FROM tbModeloPreditivo WHERE idModelo = ?";
    db.query(sql, [id], callback);
  },


  atualizar: (id, dados, callback) => {
    const sql = "UPDATE tbModeloPreditivo SET acuracia = ?, descricao = ? WHERE idModelo = ?";
    db.query(sql, [dados.acuracia, dados.descricao, id], callback);
  },

  
  deletar: (id, callback) => {
    const sqlPredicao = "DELETE FROM tbPredicaoEvasao WHERE tbIdModelo = ?";
    const sqlModelo = "DELETE FROM tbModeloPreditivo WHERE idModelo = ?";
    
    db.query(sqlPredicao, [id], (err) => {
      if (err) return callback(err);
      db.query(sqlModelo, [id], callback);
    });
  }
};

module.exports = Modelo;