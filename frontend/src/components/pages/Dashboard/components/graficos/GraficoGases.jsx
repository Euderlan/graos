import React from 'react';
import './GraficoGases.css';

export default function GraficoGases({ data, loading }) {
  if (loading) {
    return (
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">💨</span>
          <h3>Gases x Tempo</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>
        <div className="grafico-placeholder loading">
          <div className="skeleton"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">💨</span>
          <h3>Gases x Tempo</h3>
          <button className="info-btn-small-gases" title="Mais info">ℹ</button>
        </div>
        <div className="grafico-placeholder empty">
          <p>Sem dados disponíveis para exibir gráfico</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grafico-card">
      <div className="grafico-header">
        <span className="grafico-icon">💨</span>
        <h3>Gases x Tempo</h3>
        <button className="info-btn-small" title="Mais info">ℹ</button>
      </div>
      <div className="grafico-placeholder">
        {/* Aqui você inserirá seu gráfico com Recharts ou Chart.js */}
        {/* Exemplo usando recharts: */}
        {/* <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tempo" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="co2" stroke="#4CAF50" />
          <Line type="monotone" dataKey="covs" stroke="#FF9800" />
        </LineChart> */}
        
        <svg width="100%" height="200" viewBox="0 0 600 200" className="placeholder-chart">
          {/* Grid */}
          <defs>
            <pattern id="grid-gases" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-gases)" />
          
          {/* Eixos */}
          <line x1="50" y1="150" x2="550" y2="150" stroke="#999" strokeWidth="2"/>
          <line x1="50" y1="150" x2="50" y2="30" stroke="#999" strokeWidth="2"/>
          
          {/* Placeholder para dados */}
          <text x="300" y="95" textAnchor="middle" fill="#999" fontSize="14">
            Conectar com dados reais do backend
          </text>
        </svg>
      </div>
    </div>
  );
}