import React, { useState } from 'react';
import RegistroManual from './RegistroManual';
import GaleriaFotos from './GaleriaFotos';
import ExportacaoDados from './ExportacaoDados';
import HistoricoRegistros from './HistoricoRegistros';
import ImportacaoDados from './ImportacaoDados';
import './RegistroDados.css';

export default function RegistroDados() {
  const [registros, setRegistros] = useState([]);
  const [importedData, setImportedData] = useState(null);

  const handleNovoRegistro = (novoRegistro) => {
    const registroComId = {
      ...novoRegistro,
      id: Date.now()
    };
    setRegistros([registroComId, ...registros]);
  };

  const handleDataImported = (data) => {
    setImportedData(data);
    console.log('Dados importados para o sistema:', data);
  };

  return (
    <div className="registro-dados-page">
      <div className="page-container">
        <div className="page-row">
          <div className="page-section">
            <RegistroManual onRegistroSalvo={handleNovoRegistro} />
          </div>
          <div className="page-section">
            <ImportacaoDados onDataImported={handleDataImported} />
          </div>
        </div>

        <div className="page-row">
          <div className="page-section">
            <GaleriaFotos />
          </div>
          <div className="page-section">
            <ExportacaoDados />
          </div>
        </div>

        <div className="page-row">
          <div className="page-section">
            <HistoricoRegistros registros={registros} />
          </div>
        </div>
      </div>
    </div>
  );
}