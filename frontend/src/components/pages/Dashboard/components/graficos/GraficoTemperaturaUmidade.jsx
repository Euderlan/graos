import React from 'react';
import './GraficoTemperaturaUmidade.css';

export default function GraficoTemperaturaUmidade({ data, loading }) {
  if (loading) {
    return (
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">🌡️</span>
          <h3>Temperatura + Umidade x Tempo</h3>
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
          <span className="grafico-icon">🌡️</span>
          <h3>Temperatura + Umidade x Tempo</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
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
        <span className="grafico-icon">🌡️</span>
        <h3>Temperatura + Umidade x Tempo</h3>
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
          <Line type="monotone" dataKey="temperatura" stroke="#FF9800" />
          <Line type="monotone" dataKey="umidade" stroke="#2196F3" />
        </LineChart> */}
        
        <svg width="100%" height="250" viewBox="0 0 600 250" className="placeholder-chart">
          {/* Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Eixos */}
          <line x1="50" y1="200" x2="550" y2="200" stroke="#999" strokeWidth="2"/>
          <line x1="50" y1="200" x2="50" y2="30" stroke="#999" strokeWidth="2"/>
          
          {/* Placeholder para dados */}
          <text x="300" y="120" textAnchor="middle" fill="#999" fontSize="14">
            Conectar com dados reais do backend
          </text>
        </svg>
      </div>
    </div>
  );
}