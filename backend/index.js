const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

app.use(express.json());

// Importação das Rotas
const alunoRoutes = require('./routes/alunoRoutes');
const desempenhoRoutes = require('./routes/desempenhoRoutes');
const predicaoRoutes = require('./routes/predicaoRoutes');
const modeloRoutes = require('./routes/modeloRoutes');
const gestorRoutes = require('./routes/gestorRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const logAcessRoutes = require('./routes/logAcessRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use(cors());

// Uso das Rotas com prefixo /api
app.use('/api/alunos', alunoRoutes);
app.use('/api/desempenho', desempenhoRoutes);
app.use('/api/predicao', predicaoRoutes);
app.use('/api/modelos', modeloRoutes);
app.use('/api/gestor', gestorRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/logs', logAcessRoutes);
app.use('/api/dashboard', dashboardRoutes); 

app.listen(3000, '0.0.0.0', () => console.log("Servidor rodando na porta 3000"));