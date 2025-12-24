import React from 'react';
import TemperaturaCard from './cards/TemperaturaCard';
import UmidadeCard from './cards/UmidadeCard';
import GasesCard from './cards/GasesCard';
import './MetricasSection.css';

export default function MetricasSection({ metricas, loading }) {
  return (
    <div className="metricas-section">
      <TemperaturaCard data={metricas?.temperatura} loading={loading} />
      <UmidadeCard data={metricas?.umidade} loading={loading} />
      <GasesCard data={metricas?.gases} loading={loading} />
    </div>
  );
}