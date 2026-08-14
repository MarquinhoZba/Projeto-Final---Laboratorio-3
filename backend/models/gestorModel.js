const db = require('../config/db');

module.exports = {
    
    buscarPorEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tbGestor WHERE email = ?', [email], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]); 
            });
        });
    },

    buscarPorId: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT idGestor, nomeGestor, email, cargo, senha FROM tbGestor WHERE idGestor = ?', [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },

    
    atualizar: (id, dados) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE tbGestor SET nomeGestor = ?, cargo = ?, email = ?, senha = ? WHERE idGestor = ?',
                [dados.nomeGestor, dados.cargo, dados.email, dados.senha, id],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    
    validarLogin: (email, senha) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT idGestor FROM tbGestor WHERE email = ? AND senha = ?";
            db.query(sql, [email, senha], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    if (results.length > 0) {
                        resolve(results[0].idGestor); 
                    } else {
                        resolve(null); 
                    }
                }
            });
        });
    }
};