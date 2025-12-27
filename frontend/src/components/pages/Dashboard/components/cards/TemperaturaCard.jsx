import React from 'react';
import './TemperaturaCard.css';
import { MdThermostat } from 'react-icons/md';

export default function TemperaturaCard({ data, loading }) {
  if (loading) {
    return (
      <div className="metrica-card loading">
        <div className="metrica-header">
          <span className="metrica-icon">🌡️</span>
          <h3>Temperatura Média (°C)</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>
        <div className="skeleton valor"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="metrica-card empty">
        <div className="metrica-header">
          <span className="metrica-icon">🌡️</span>
          <h3>Temperatura Média (°C)</h3>
          <button className="info-btn-small" title="Mais info">ℹ</button>
        </div>
        <p className="empty-message">Sem dados disponíveis</p>
      </div>
    );
  }

  return (
    <div className="metrica-card">
      <div className="metrica-header">
        <span className="metrica-icon">🌡️</span>
        <h3>Temperatura Média (°C)</h3>
        <button className="info-btn-small" title="Mais info">ℹ</button>
      </div>
      <div className="metrica-valor">
        <span className="valor">{data.valor}</span>
        <span className="unidade">{data.unidade}</span>
      </div>
      {data.minimo !== undefined && data.maximo !== undefined && (
        <div className="metrica-range">
          <span className="range-label">Min: {data.minimo}°C | Max: {data.maximo}°C</span>
        </div>
      )}
    </div>
  );
}