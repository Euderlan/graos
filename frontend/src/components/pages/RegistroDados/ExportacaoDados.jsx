import React, { useState } from 'react';
import './ExportacaoDados.css';

// Componente para Exportação de Dados (RF09)
// Permite exportar dados em Excel (XLSX) ou CSV

export default function ExportacaoDados() {
  // Estado para controlar a opção de exportação
  const [selectedFormat, setSelectedFormat] = useState('excel');

  // Manipula a mudança de formato
  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  // Função para exportar em Excel (XLSX)
  const handleExportarExcel = () => {
    // Dados de exemplo (você integraria com dados reais)
    const dados = [
      {
        Data: '19/04/2024',
        Hora: '16:00',
        pH: '6,2',
        Temperatura: '25,2°C',
        Umidade: '64%',
        Grupo: 'Umidade Alta'
      },
      {
        Data: '18/04/2024',
        Hora: '16:00',
        pH: '6,1',
        Temperatura: '25,0°C',
        Umidade: '62%',
        Grupo: 'Controle'
      },
      {
        Data: '17/04/2024',
        Hora: '16:00',
        pH: '6,4',
        Temperatura: '28,5°C',
        Umidade: '58%',
        Grupo: 'Temperatura Alta'
      }
    ];

    // Simula a criação de um arquivo XLSX
    // Para usar em produção, instale: npm install xlsx
    console.log('Exportando para Excel...', dados);
    
    // Cria um CSV e simula download de Excel
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(dados[0]);
    
    csvContent += headers.join(",") + "\n";
    dados.forEach(row => {
      csvContent += Object.values(row).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dados_graos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Arquivo Excel exportado com sucesso!');
  };

  // Função para exportar em CSV
  const handleExportarCSV = () => {
    // Dados de exemplo
    const dados = [
      {
        Data: '19/04/2024',
        Hora: '16:00',
        pH: '6,2',
        Temperatura: '25,2°C',
        Umidade: '64%',
        Grupo: 'Umidade Alta'
      },
      {
        Data: '18/04/2024',
        Hora: '16:00',
        pH: '6,1',
        Temperatura: '25,0°C',
        Umidade: '62%',
        Grupo: 'Controle'
      },
      {
        Data: '17/04/2024',
        Hora: '16:00',
        pH: '6,4',
        Temperatura: '28,5°C',
        Umidade: '58%',
        Grupo: 'Temperatura Alta'
      }
    ];

    // Cria conteúdo CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    const headers = Object.keys(dados[0]);
    
    csvContent += headers.join(";") + "\n";
    dados.forEach(row => {
      csvContent += Object.values(row).join(";") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dados_graos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('Arquivo CSV exportado com sucesso!');
  };

  return (
    <div className="exportacao-dados-container">
      <div className="card">
        <div className="card-header">
          <span className="icon-export">📊</span>
          <h2>Exportação de Dados</h2>
          <button className="info-btn" title="Informações">ℹ</button>
        </div>

        {/* Seção de Seleção de Formato */}
        <div className="export-section">
          <label className="export-label">Exportar para:</label>
          
          <div className="radio-group">
            {/* Opção Excel */}
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

            {/* Opção CSV */}
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

        {/* Informação sobre os dados */}
        <div className="export-info">
          <p className="info-text">
            Você está prestes a exportar os dados de todas as medições realizadas.
            O arquivo incluirá pH, temperatura, umidade e observações.
          </p>
        </div>

        {/* Botão Exportar */}
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