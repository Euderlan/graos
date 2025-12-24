import React, { useState } from 'react';
import './Dashboard.css';

// Componente Dashboard para visualização de dados (RF10)
// Exibe métricas e gráficos de temperatura, umidade e gases

export default function Dashboard() {
  // Estado para filtros
  const [filters, setFilters] = useState({
    produto: 'SOJA',
    grupo: 'Controle',
    periodo: 'ultimas-2-semanas'
  });

  // Dados de exemplo (você integraria com dados reais)
  const metricas = {
    temperatura: {
      valor: '25,2',
      unidade: '°C',
      icone: '🌡️'
    },
    umidade: {
      valor: '64',
      unidade: '%',
      icone: '💧'
    },
    gases: {
      co2: '1,1%',
      covs: '85',
      icone: '🔥'
    }
  };

  // Manipula mudanças nos filtros
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="dashboard-container">
      {/* Seção de Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="produto">Produto</label>
          <select
            id="produto"
            value={filters.produto}
            onChange={(e) => handleFilterChange('produto', e.target.value)}
            className="filter-select"
          >
            <option value="SOJA">SOJA</option>
            <option value="FEIJAO">FEIJÃO</option>
            <option value="MILHO">MILHO</option>
            <option value="ARROZ">ARROZ</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="grupo">Grupo Experimental</label>
          <select
            id="grupo"
            value={filters.grupo}
            onChange={(e) => handleFilterChange('grupo', e.target.value)}
            className="filter-select"
          >
            <option value="Controle">Controle</option>
            <option value="Umidade Alta">Umidade Alta</option>
            <option value="Temperatura Alta">Temperatura Alta</option>
            <option value="Extremo">Extremo</option>
          </select>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>

        <div className="filter-group">
          <label htmlFor="periodo">Período</label>
          <select
            id="periodo"
            value={filters.periodo}
            onChange={(e) => handleFilterChange('periodo', e.target.value)}
            className="filter-select"
          >
            <option value="ultimas-2-semanas">Últimas 2 Semanas</option>
            <option value="ultimo-mes">Último Mês</option>
            <option value="ultimos-3-meses">Últimos 3 Meses</option>
            <option value="todo-periodo">Todo Período</option>
          </select>
        </div>

        <div className="atualizado-info">
          Atualizado em: <span>02/10/2025, 17:42:14</span>
        </div>
      </div>

      {/* Seção de Métricas */}
      <div className="metricas-section">
        {/* Métrica Temperatura */}
        <div className="metrica-card">
          <div className="metrica-header">
            <span className="metrica-icon">{metricas.temperatura.icone}</span>
            <h3>Temperatura Média (°C)</h3>
            <button className="info-btn-small" title="Mais info">ℹ</button>
          </div>
          <div className="metrica-valor">
            <span className="valor">{metricas.temperatura.valor}</span>
            <span className="unidade">{metricas.temperatura.unidade}</span>
          </div>
        </div>

        {/* Métrica Umidade */}
        <div className="metrica-card">
          <div className="metrica-header">
            <span className="metrica-icon">{metricas.umidade.icone}</span>
            <h3>Umidade Média (%)</h3>
            <button className="info-btn-small" title="Mais info">ℹ</button>
          </div>
          <div className="metrica-valor">
            <span className="valor">{metricas.umidade.valor}</span>
            <span className="unidade">{metricas.umidade.unidade}</span>
          </div>
        </div>

        {/* Métrica Gases */}
        <div className="metrica-card">
          <div className="metrica-header">
            <span className="metrica-icon">{metricas.gases.icone}</span>
            <h3>Gases/Compostos (ppm)</h3>
            <button className="info-btn-small" title="Mais info">ℹ</button>
          </div>
          <div className="metrica-gases">
            <div className="gas-item">
              <span className="gas-label">CO2</span>
              <span className="gas-value">{metricas.gases.co2}</span>
            </div>
            <div className="gas-item">
              <span className="gas-label">COVs</span>
              <span className="gas-value">{metricas.gases.covs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico 1: Temperatura + Umidade x Tempo */}
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">🌡️</span>
          <h3>Temperatura + Umidade x Tempo</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>
        <div className="grafico-placeholder">
          <p>Gráfico de Temperatura e Umidade ao longo do tempo</p>
          <svg width="100%" height="200" viewBox="0 0 500 200">
            <polyline points="10,100 50,80 100,75 150,85 200,90 250,70 300,60 350,75 400,85 450,95" 
              stroke="#4CAF50" strokeWidth="2" fill="none" />
            <polyline points="10,120 50,110 100,115 150,100 200,105 250,120 300,130 350,115 400,100 450,95" 
              stroke="#2196F3" strokeWidth="2" fill="none" />
            <polyline points="10,140 50,130 100,125 150,135 200,140 250,125 300,115 350,130 400,145 450,150" 
              stroke="#FF9800" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Gráfico 2: Gases x Tempo */}
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">💨</span>
          <h3>Gases x Tempo</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>
        <div className="grafico-placeholder">
          <p>Variação de gases ao longo do tempo</p>
          <svg width="100%" height="150" viewBox="0 0 500 150">
            <polyline points="10,100 50,95 100,90 150,92 200,88 250,85 300,87 350,92 400,98 450,105" 
              stroke="#4CAF50" strokeWidth="2" fill="none" />
            <polyline points="10,80 50,75 100,70 150,75 200,80 250,85 300,82 350,78 400,72 450,75" 
              stroke="#FF9800" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Gráfico 3: Sensores vs Deterioração */}
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">📊</span>
          <h3>Sensores vs Deterioração</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>
        <div className="grafico-placeholder">
          <p>Correlação entre dados de sensores e nível de deterioração</p>
          <svg width="100%" height="150" viewBox="0 0 500 150">
            <circle cx="80" cy="120" r="4" fill="#2196F3" />
            <circle cx="130" cy="100" r="4" fill="#2196F3" />
            <circle cx="180" cy="85" r="4" fill="#2196F3" />
            <circle cx="230" cy="70" r="4" fill="#2196F3" />
            <circle cx="100" cy="110" r="4" fill="#4CAF50" />
            <circle cx="150" cy="90" r="4" fill="#4CAF50" />
            <circle cx="200" cy="75" r="4" fill="#4CAF50" />
            <circle cx="250" cy="60" r="4" fill="#4CAF50" />
            <circle cx="120" cy="95" r="4" fill="#FF9800" />
            <circle cx="170" cy="80" r="4" fill="#FF9800" />
            <circle cx="220" cy="65" r="4" fill="#FF9800" />
            <circle cx="270" cy="50" r="4" fill="#FF9800" />
          </svg>
        </div>
      </div>
    </div>
  );
}