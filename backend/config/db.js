const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'computer',
    database: process.env.DB_NAME || 'dbmodeloevasao',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    multipleStatements: true
});

// Teste de conexão (Padrão Callback que você já usava)
pool.getConnection((err, conn) => {
    if (err) {
        console.error('❌ Erro ao conectar no MySQL:', err.message);
    } else {
        console.log('✅ Banco conectado com sucesso!');
        conn.release();
    }
});

module.exports = pool;