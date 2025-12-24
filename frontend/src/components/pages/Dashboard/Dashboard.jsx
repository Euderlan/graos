import React, { useState } from 'react';
import FiltersSection from './components/FiltersSection';
import MetricasSection from './components/MetricasSection';
import GraficoTemperaturaUmidade from './components/graficos/GraficoTemperaturaUmidade';
import GraficoGases from './components/graficos/GraficoGases';
import GraficoSensoresDeteriorizacao from './components/graficos/GraficoSensoresDeteriorizacao';
import './Dashboard.css';

export default function Dashboard() {
  const [filters, setFilters] = useState({
    produto: 'SOJA',
    grupoExperimental: 'Controle',
    periodo: 'ultimas-2-semanas'
  });

  // Estado para métricas (será preenchido pelo backend)
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(false);

  // Estado para gráficos (será preenchido pelo backend)
  const [graficos, setGraficos] = useState(null);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    
    // Aqui você faria a chamada à API
    // setLoading(true);
    // fetchDados(filters).then(data => {
    //   setMetricas(data.metricas);
    //   setGraficos(data.graficos);
    //   setLoading(false);
    // });
  };

  return (
    <div className="dashboard-container">
      {/* Seção de Filtros */}
      <FiltersSection filters={filters} onFilterChange={handleFilterChange} />

      {/* Seção de Métricas */}
      <MetricasSection metricas={metricas} loading={loading} />

      {/* Gráficos */}
      <div className="graficos-section">
        <GraficoTemperaturaUmidade data={graficos?.temperaturaUmidade} loading={loading} />
        <GraficoGases data={graficos?.gases} loading={loading} />
        <GraficoSensoresDeteriorizacao data={graficos?.sensoresDeteriorizacao} loading={loading} />
      </div>
    </div>
  );
}