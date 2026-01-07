import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dados simulados (em memoria)
let metricas = {
  temperatura: {
    valor: 25.2,
    unidade: 'C',
    minimo: 22.1,
    maximo: 28.5
  },
  umidade: {
    valor: 64,
    unidade: '%',
    minimo: 58,
    maximo: 72
  },
  gases: {
    co2: {
      valor: 1.1,
      unidade: 'ppm'
    },
    covs: {
      valor: 85,
      unidade: 'ppm'
    }
  }
};

let dados = [
  {
    id: 1,
    data: '2024-04-19',
    hora: '16:00',
    temperatura: 25.2,
    umidade: 64,
    co2: 1.1,
    covs: 85,
    grupo: 'Controle'
  },
  {
    id: 2,
    data: '2024-04-18',
    hora: '16:00',
    temperatura: 25.0,
    umidade: 62,
    co2: 1.0,
    covs: 82,
    grupo: 'Controle'
  },
  {
    id: 3,
    data: '2024-04-17',
    hora: '16:00',
    temperatura: 24.8,
    umidade: 60,
    co2: 0.95,
    covs: 80,
    grupo: 'Umidade Alta'
  }
];

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// GET - Obter metricas atuais
app.get('/api/metricas', (req, res) => {
  res.json({
    sucesso: true,
    data: metricas,
    timestamp: new Date().toISOString()
  });
});

// GET - Obter dados com filtros
app.get('/api/dados', (req, res) => {
  const { produto = 'SOJA', grupo = 'Controle', periodo = 'ultimas-2-semanas' } = req.query;

  let dadosFiltrados = dados.filter(d => d.grupo === grupo);

  res.json({
    sucesso: true,
    filtros: {
      produto,
      grupo,
      periodo
    },
    total: dadosFiltrados.length,
    data: dadosFiltrados,
    timestamp: new Date().toISOString()
  });
});

// GET - Obter dados de temperatura e umidade por tempo
app.get('/api/graficos/temperatura-umidade', (req, res) => {
  const { periodo = 'ultimas-2-semanas' } = req.query;

  const graficoData = [
    { tempo: '00:00', temperatura: 22.5, umidade: 58 },
    { tempo: '04:00', temperatura: 21.8, umidade: 62 },
    { tempo: '08:00', temperatura: 23.2, umidade: 60 },
    { tempo: '12:00', temperatura: 25.5, umidade: 55 },
    { tempo: '16:00', temperatura: 26.1, umidade: 52 },
    { tempo: '20:00', temperatura: 24.8, umidade: 64 },
    { tempo: '23:59', temperatura: 22.9, umidade: 68 }
  ];

  res.json({
    sucesso: true,
    periodo,
    data: graficoData,
    timestamp: new Date().toISOString()
  });
});

// GET - Obter dados de gases por tempo
app.get('/api/graficos/gases', (req, res) => {
  const { periodo = 'ultimas-2-semanas' } = req.query;

  const graficoData = [
    { tempo: '00:00', co2: 0.8, covs: 78 },
    { tempo: '04:00', co2: 0.9, covs: 80 },
    { tempo: '08:00', co2: 1.0, covs: 82 },
    { tempo: '12:00', co2: 1.2, covs: 85 },
    { tempo: '16:00', co2: 1.1, covs: 84 },
    { tempo: '20:00', co2: 0.95, covs: 81 },
    { tempo: '23:59', co2: 0.85, covs: 79 }
  ];

  res.json({
    sucesso: true,
    periodo,
    data: graficoData,
    timestamp: new Date().toISOString()
  });
});

// GET - Sensores vs Deterioracao
app.get('/api/graficos/sensores-deterioracao', (req, res) => {
  const graficoData = {
    controle: [
      { deterioracao: 5, valor: 92 },
      { deterioracao: 8, valor: 88 },
      { deterioracao: 12, valor: 82 }
    ],
    umidadeAlta: [
      { deterioracao: 15, valor: 78 },
      { deterioracao: 20, valor: 72 },
      { deterioracao: 25, valor: 65 }
    ],
    temperaturaAlta: [
      { deterioracao: 18, valor: 75 },
      { deterioracao: 22, valor: 68 },
      { deterioracao: 28, valor: 60 }
    ],
    extremo: [
      { deterioracao: 30, valor: 55 },
      { deterioracao: 35, valor: 48 },
      { deterioracao: 40, valor: 40 }
    ]
  };

  res.json({
    sucesso: true,
    data: graficoData,
    timestamp: new Date().toISOString()
  });
});

// POST - Adicionar novo dado
app.post('/api/dados', (req, res) => {
  const { temperatura, umidade, co2, covs, grupo } = req.body;

  // Validacoes basicas
  if (temperatura === undefined || umidade === undefined) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Temperatura e umidade sao obrigatorias'
    });
  }

  const novoDado = {
    id: dados.length + 1,
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    temperatura,
    umidade,
    co2: co2 || 0,
    covs: covs || 0,
    grupo: grupo || 'Controle'
  };

  dados.push(novoDado);

  // Atualizar metricas
  metricas.temperatura.valor = temperatura;
  metricas.umidade.valor = umidade;
  if (co2) metricas.gases.co2.valor = co2;
  if (covs) metricas.gases.covs.valor = covs;

  res.status(201).json({
    sucesso: true,
    mensagem: 'Dado adicionado com sucesso',
    data: novoDado,
    timestamp: new Date().toISOString()
  });
});

// PUT - Atualizar metricas manualmente
app.put('/api/metricas', (req, res) => {
  const { temperatura, umidade, co2, covs } = req.body;

  if (temperatura) {
    metricas.temperatura.valor = temperatura;
  }
  if (umidade) {
    metricas.umidade.valor = umidade;
  }
  if (co2) {
    metricas.gases.co2.valor = co2;
  }
  if (covs) {
    metricas.gases.covs.valor = covs;
  }

  res.json({
    sucesso: true,
    mensagem: 'Metricas atualizadas',
    data: metricas,
    timestamp: new Date().toISOString()
  });
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota nao encontrada'
  });
});

// Tratamento de erro geral
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    sucesso: false,
    mensagem: 'Erro interno do servidor',
    erro: err.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
