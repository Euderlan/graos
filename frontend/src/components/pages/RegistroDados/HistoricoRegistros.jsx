import React, { useState } from 'react';
import './HistoricoRegistros.css';

// Componente para Histórico de Registros Manuais
// Exibe lista de registros previamente salvos

export default function HistoricoRegistros() {
  // Dados de exemplo (você integraria com dados reais do banco)
  const [registros] = useState([
    {
      id: 1,
      data: '19/04/2024',
      hora: '16:00',
      ph: '6,2',
      testeQuimico: 'Teste de Acidez',
      grupo: 'Umidade Alta',
      observacoes: 'Odor forte de fermentação'
    },
    {
      id: 2,
      data: '18/04/2024',
      hora: '16:00',
      ph: '6,1',
      testeQuimico: 'Teste de Acidez',
      grupo: 'Controle',
      observacoes: 'Sem alterações visuais'
    },
    {
      id: 3,
      data: '17/04/2024',
      hora: '16:00',
      ph: '6,4',
      testeQuimico: 'Teste de Peróxidos',
      grupo: 'Temperatura Alta',
      observacoes: 'Presença de umidade visível'
    }
  ]);

  // Estado para expandir/recolher registros
  const [expandedId, setExpandedId] = useState(null);

  // Alterna a expansão de um registro
  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Ver todos os registros
  const handleVerTodos = () => {
    alert('Abrir página com todos os ' + registros.length + ' registros');
  };

  return (
    <div className="historico-registros-container">
      <div className="card">
        <div className="card-header">
          <span className="icon-history">📋</span>
          <h2>Histórico de Registros Manuais</h2>
          <button className="info-btn" title="Informações">ℹ</button>
        </div>

        {/* Lista de Registros */}
        <div className="registros-list">
          {registros.map((registro) => (
            <div key={registro.id} className="registro-item">
              {/* Cabeçalho do Registro */}
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
                <span className={`expand-icon ${expandedId === registro.id ? 'expanded' : ''}`}>
                  ›
                </span>
              </div>

              {/* Conteúdo Expandível */}
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

        {/* Link para Ver Todos */}
        <div className="historico-footer">
          <button onClick={handleVerTodos} className="btn-ver-todos">
            Ver todos os registros
          </button>
        </div>
      </div>
    </div>
  );
}