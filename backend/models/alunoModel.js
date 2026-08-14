const db = require('../config/db');

module.exports = {
    
    listar: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tbAluno', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    cadastrar: (aluno) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO tbAluno 
                (nomeAluno, matricula, curso, turno, idade, sexo, semestreAtual, situacao, motivoEvasao, questao1, questao2, questao3, questao4, questao5) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
            const valores = [
                aluno.nomeAluno,
                aluno.matricula,
                aluno.curso,
                aluno.turno,
                aluno.idade,
                aluno.sexo,
                aluno.semestreAtual,
                aluno.situacao,
                aluno.motivoEvasao || 'Não se aplica', 
                aluno.questao1 || '',
                aluno.questao2 || '',
                aluno.questao3 || '',
                aluno.questao4 || '',
                aluno.questao5 || ''
            ];

            db.query(query, valores, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM tbAluno WHERE idAluno = ?', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    atualizar: (id, aluno) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE tbAluno SET 
                nomeAluno=?, matricula=?, curso=?, turno=?, idade=?, sexo=?, semestreAtual=?, situacao=?, motivoEvasao=?, 
                questao1=?, questao2=?, questao3=?, questao4=?, questao5=?
                WHERE idAluno=?`;

            const valores = [
                aluno.nomeAluno,
                aluno.matricula,
                aluno.curso,
                aluno.turno,
                aluno.idade,
                aluno.sexo,
                aluno.semestreAtual,
                aluno.situacao,
                aluno.motivoEvasao || 'Não se aplica',
                aluno.questao1 || '',
                aluno.questao2 || '',
                aluno.questao3 || '',
                aluno.questao4 || '',
                aluno.questao5 || '',
                id
            ];

            db.query(query, valores, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

   
  getEstatisticas: async () => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM tbAluno) as totalAlunos,
            (SELECT COUNT(*) FROM tbPredicaoEvasao WHERE resultado = 'Alto') as riscoAlto,
            (SELECT COUNT(*) FROM tbPredicaoEvasao WHERE resultado = 'Medio') as riscoMedio,
            (SELECT COUNT(*) FROM tbPredicaoEvasao WHERE resultado = 'Baixo') as riscoBaixo
    `;
    const [rows] = await db.query(sql);
    return rows[0]; 
 }

};