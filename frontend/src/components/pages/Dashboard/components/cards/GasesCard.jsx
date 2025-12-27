import React from 'react';
import { MdAir } from 'react-icons/md';
import './GasesCard.css';

export default function GasesCard({ data, loading }) {
  if (loading) {
    return (
      <div className="metrica-card loading">
        <div className="metrica-header">
          <MdAir className="metrica-icon" />
          <h3>Gases/Compostos (ppm)</h3>
          <button className="info-btn-small" title="Mais info">i</button>
        </div>
        <div className="skeleton valor"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="metrica-card empty">
        <div className="metrica-header">
          <MdAir className="metrica-icon" />
          <h3>Gases/Compostos (ppm)</h3>
          <button className="info-btn-small" title="Mais info">i</button>
        </div>
        <p className="empty-message">Sem dados disponíveis</p>
      </div>
    );
  }

  return (
    <div className="metrica-card">
      <div className="metrica-header">
        <MdAir className="metrica-icon" />
        <h3>Gases/Compostos (ppm)</h3>
        <button className="info-btn-small" title="Mais info">i</button>
      </div>
      <div className="metrica-gases">
        {data.co2 && (
          <div className="gas-item">
            <span className="gas-label">CO2</span>
            <span className="gas-value">{data.co2.valor}{data.co2.unidade}</span>
          </div>
        )}
        {data.covs && (
          <div className="gas-item">
            <span className="gas-label">COVs</span>
            <span className="gas-value">{data.covs.valor} {data.covs.unidade}</span>
          </div>
        )}
      </div>
    </div>
  );
}