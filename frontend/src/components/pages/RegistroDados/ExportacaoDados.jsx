import React, { useState } from 'react';
import { MdDownload, MdInfoOutline } from 'react-icons/md';
import './ExportacaoDados.css';

export default function ExportacaoDados() {
  const [selectedFormat, setSelectedFormat] = useState('excel');
  const [selectedGrao, setSelectedGrao] = useState('SOJA');
  const [selectedPeriodo, setSelectedPeriodo] = useState('ultimas-2-semanas');

  const graos = [
    { value: 'SOJA', label: 'Soja' },
    { value: 'FEIJAO', label: 'Feijão' },
    { value: 'MILHO', label: 'Milho' },
    { value: 'ARROZ', label: 'Arroz' }
  ];

  const periodos = [
    { value: 'ultimas-2-semanas', label: 'Últimas 2 Semanas' },
    { value: 'ultimo-mes', label: 'Último Mês' },
    { value: 'ultimos-3-meses', label: 'Últimos 3 Meses' },
    { value: 'todo-periodo', label: 'Todo Período' }
  ];

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleExportarExcel = () => {
    const dados = [
      {
        Data: '19/04/2024',
        Hora: '16:00',
        Grao: selectedGrao,
        pH: '6,2',
        Temperatura: '25,2',
        Umidade: '64',
        CO2: '1,1',
        COVs: '85'
      },
      {
        Data: '18/04/2024',
        Hora: '16:00',
        Grao: selectedGrao,
        pH: '6,1',
        Temperatura: '25,0',
        Umidade: '62',
        CO2: '1,0',
        COVs: '82'
      }
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(dados[0]);
    
    csvContent += headers.join(",") + "\n";
    dados.forEach(row => {
      csvContent += Object.values(row).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dados_${selectedGrao}_${selectedPeriodo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Arquivo exportado com sucesso!');
  };

  const handleExportarCSV = () => {
    const dados = [
      {
        Data: '19/04/2024',
        Hora: '16:00',
        Grao: selectedGrao,
        pH: '6,2',
        Temperatura: '25,2',
        Umidade: '64',
        CO2: '1,1',
        COVs: '85'
      },
      {
        Data: '18/04/2024',
        Hora: '16:00',
        Grao: selectedGrao,
        pH: '6,1',
        Temperatura: '25,0',
        Umidade: '62',
        CO2: '1,0',
        COVs: '82'
      }
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(dados[0]);
    
    csvContent += headers.join(";") + "\n";
    dados.forEach(row => {
      csvContent += Object.values(row).join(";") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dados_${selectedGrao}_${selectedPeriodo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Arquivo exportado com sucesso!');
  };

  return (
    <div className="exportacao-dados-container">
      <div className="card">
        <div className="card-header">
          <MdDownload className="icon-export" />
          <h2>Exportação de Dados</h2>
          <button className="info-btn" title="Informações">
            <MdInfoOutline />
          </button>
        </div>

        <div className="export-section">
          <label className="export-label">Grão</label>
          <select
            value={selectedGrao}
            onChange={(e) => setSelectedGrao(e.target.value)}
            className="filter-select"
          >
            {graos.map(grao => (
              <option key={grao.value} value={grao.value}>
                {grao.label}
              </option>
            ))}
          </select>
        </div>

        <div className="export-section">
          <label className="export-label">Período</label>
          <select
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
            className="filter-select"
          >
            {periodos.map(periodo => (
              <option key={periodo.value} value={periodo.value}>
                {periodo.label}
              </option>
            ))}
          </select>
        </div>

        <div className="export-section">
          <label className="export-label">Formato:</label>
          
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="excel"
                name="format"
                value="excel"
                checked={selectedFormat === 'excel'}
                onChange={() => handleFormatChange('excel')}
                className="radio-input"
              />
              <label htmlFor="excel" className="radio-label">
                <span className="radio-custom"></span>
                Excel (.XLSX)
              </label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="csv"
                name="format"
                value="csv"
                checked={selectedFormat === 'csv'}
                onChange={() => handleFormatChange('csv')}
                className="radio-input"
              />
              <label htmlFor="csv" className="radio-label">
                <span className="radio-custom"></span>
                CSV (.CSV)
              </label>
            </div>
          </div>
        </div>

        <div className="export-info">
          <p className="info-text">
            Você está exportando dados de {selectedGrao} no período {selectedPeriodo}. 
            O arquivo incluirá pH, temperatura, umidade, gases e observações.
          </p>
        </div>

        <button
          onClick={selectedFormat === 'excel' ? handleExportarExcel : handleExportarCSV}
          className="btn-exportar"
        >
          Exportar
        </button>
      </div>
    </div>
  );
}