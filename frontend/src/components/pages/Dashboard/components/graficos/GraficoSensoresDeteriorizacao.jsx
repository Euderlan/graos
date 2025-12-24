import React from 'react';
import './GraficoSensoresDeteriorizacao.css';

export default function GraficoSensoresDeteriorizacao({ data, loading }) {
  if (loading) {
    return (
      <div className="grafico-card">
        <div className="grafico-header">
          <span className="grafico-icon">📊</span>
          <h3>Sensores vs Deterioração</h3>
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
          <span className="grafico-icon">📊</span>
          <h3>Sensores vs Deterioração</h3>
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
        <span className="grafico-icon">📊</span>
        <h3>Sensores vs Deterioração</h3>
        <button className="info-btn-small" title="Mais info">ℹ</button>
      </div>
      <div className="grafico-placeholder">
        {/* Aqui você inserirá seu gráfico com Recharts ou Chart.js */}
        {/* Exemplo usando recharts ScatterChart: */}
        {/* <ScatterChart width={600} height={300} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="deterioracao" />
          <YAxis dataKey="valor" />
          <Tooltip />
          <Legend />
          <Scatter name="Controle" data={data.controle} fill="#2196F3" />
          <Scatter name="Umidade Alta" data={data.umidadeAlta} fill="#4CAF50" />
          <Scatter name="Temperatura Alta" data={data.temperaturaAlta} fill="#FF9800" />
          <Scatter name="Extremo" data={data.extremo} fill="#F44336" />
        </ScatterChart> */}
        
        <svg width="100%" height="250" viewBox="0 0 600 250" className="placeholder-chart">
          {/* Grid */}
          <defs>
            <pattern id="grid-sensores" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-sensores)" />
          
          {/* Eixos */}
          <line x1="50" y1="200" x2="550" y2="200" stroke="#999" strokeWidth="2"/>
          <line x1="50" y1="200" x2="50" y2="30" stroke="#999" strokeWidth="2"/>
          
          {/* Labels dos eixos */}
          <text x="300" y="230" textAnchor="middle" fill="#666" fontSize="12">Deterioração (%)</text>
          <text x="20" y="115" textAnchor="middle" fill="#666" fontSize="12" transform="rotate(-90 20 115)">Sensor (valor)</text>
          
          {/* Placeholder para dados */}
          <text x="300" y="120" textAnchor="middle" fill="#999" fontSize="14">
            Conectar com dados reais do backend
          </text>
        </svg>
      </div>
    </div>
  );
}