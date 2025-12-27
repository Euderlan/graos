import React, { useState } from 'react';
import { MdHistory, MdInfoOutline, MdExpandMore } from 'react-icons/md';
import './HistoricoRegistros.css';

export default function HistoricoRegistros({ registros = [] }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleVerTodos = () => {
    alert('Abrir página com todos os ' + registros.length + ' registros');
  };

  if (registros.length === 0) {
    return (
      <div className="historico-registros-container">
        <div className="card">
          <div className="card-header">
            <MdHistory className="icon-history" />
            <h2>Histórico de Registros Manuais</h2>
            <button className="info-btn" title="Informações">
              <MdInfoOutline />
            </button>
          </div>
          <div className="empty-state">
            <p className="empty-message">Nenhum registro manual realizado ainda</p>
            <p className="empty-description">Os registros aparecerão aqui quando você salvar novos dados</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="historico-registros-container">
      <div className="card">
        <div className="card-header">
          <MdHistory className="icon-history" />
          <h2>Histórico de Registros Manuais</h2>
          <button className="info-btn" title="Informações">
            <MdInfoOutline />
          </button>
        </div>

        <div className="registros-list">
          {registros.map((registro) => (
            <div key={registro.id} className="registro-item">
              <div
                className="registro-header"
                onClick={() => toggleExpanded(registro.id)}
                role="button"
                tabIndex={0}
              >
                <div className="registro-info">
                  <p className="registro-data">
                    {registro.data} - {registro.hora} — pH {registro.ph} — {registro.testeQuimico}
                  </p>
                  <p className="registro-grupo">{registro.grupo}</p>
                </div>
                <MdExpandMore className={`expand-icon ${expandedId === registro.id ? 'expanded' : ''}`} />
              </div>

              {expandedId === registro.id && (
                <div className="registro-details">
                  <div className="detail-row">
                    <span className="detail-label">Data/Hora:</span>
                    <span className="detail-value">{registro.data} {registro.hora}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">pH:</span>
                    <span className="detail-value">{registro.ph}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Teste Químico:</span>
                    <span className="detail-value">{registro.testeQuimico}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Grupo:</span>
                    <span className="detail-value">{registro.grupo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Observações:</span>
                    <span className="detail-value">{registro.observacoes}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {registros.length > 5 && (
          <div className="historico-footer">
            <button onClick={handleVerTodos} className="btn-ver-todos">
              Ver todos os registros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}