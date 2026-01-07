# Backend - Monitoramento de Graos

Backend simples em Node.js + Express para servir dados de temperatura, umidade e gases.

## Instalacao

```bash
cd grain-monitoring-backend
npm install
```

## Executar

```bash
# Modo producao
npm start

# Modo desenvolvimento (com reload automatico)
npm run dev
```

O servidor vai rodar em `http://localhost:5000`

## Endpoints

### Health Check
```
GET /api/health
```

### Metricas Atuais
```
GET /api/metricas
```
Retorna temperatura, umidade e gases atuais.

### Listar Dados
```
GET /api/dados?produto=SOJA&grupo=Controle&periodo=ultimas-2-semanas
```

### Grafico Temperatura + Umidade
```
GET /api/graficos/temperatura-umidade?periodo=ultimas-2-semanas
```

### Grafico Gases
```
GET /api/graficos/gases?periodo=ultimas-2-semanas
```

### Grafico Sensores vs Deterioracao
```
GET /api/graficos/sensores-deterioracao
```

### Adicionar Novo Dado
```
POST /api/dados
Content-Type: application/json

{
  "temperatura": 25.5,
  "umidade": 62,
  "co2": 1.1,
  "covs": 85,
  "grupo": "Controle"
}
```

### Atualizar Metricas
```
PUT /api/metricas
Content-Type: application/json

{
  "temperatura": 26.0,
  "umidade": 65,
  "co2": 1.2,
  "covs": 87
}
```

## Conectar com Frontend

No arquivo `frontend/src/components/pages/Dashboard/Dashboard.jsx`, adicione as chamadas à API:

```javascript
const handleFilterChange = (filterName, value) => {
  setFilters(prev => ({
    ...prev,
    [filterName]: value
  }));
  
  // Chamar API
  fetch(`http://localhost:5000/api/metricas`)
    .then(res => res.json())
    .then(data => {
      setMetricas(data.data);
    });
};
```

## Estrutura de Dados

### Metrica
```javascript
{
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
    co2: { valor: 1.1, unidade: 'ppm' },
    covs: { valor: 85, unidade: 'ppm' }
  }
}
```

### Dado
```javascript
{
  id: 1,
  data: '2024-04-19',
  hora: '16:00',
  temperatura: 25.2,
  umidade: 64,
  co2: 1.1,
  covs: 85,
  grupo: 'Controle'
}
```
