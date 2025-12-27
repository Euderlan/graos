import React, { useState } from 'react';
import './ImportacaoDados.css';

export default function ImportacaoDados({ onDataImported }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [importedData, setImportedData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        alert('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Arquivo muito grande. Máximo 10MB');
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-active');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-active');
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = e.dataTransfer.files;
      handleFileChange({ target: input });
    }
  };

  const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = event.target.result;
          const workbook = new Workbook();
          const worksheet = workbook.getSheet(0);
          
          const parsedData = [];
          const headers = [];
          
          for (let row = 0; row < worksheet.getRowCount(); row++) {
            const rowData = {};
            for (let col = 0; col < worksheet.getColumnCount(); col++) {
              const cell = worksheet.getCell(row, col);
              const value = cell ? cell.getValue() : '';
              
              if (row === 0) {
                headers.push(value);
              } else {
                rowData[headers[col]] = value;
              }
            }
            
            if (row > 0 && Object.keys(rowData).length > 0) {
              parsedData.push(rowData);
            }
          }
          
          resolve(parsedData);
        } catch (error) {
          reject(new Error('Erro ao processar arquivo Excel'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  };

  const handleImportar = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo');
      return;
    }

    setUploading(true);

    try {
      const data = await parseExcelFile(selectedFile);
      
      setImportedData({
        fileName: selectedFile.name,
        rowCount: data.length,
        data: data.slice(0, 10)
      });

      if (onDataImported) {
        onDataImported(data);
      }

      alert(`Arquivo importado com sucesso! ${data.length} registros encontrados.`);
      setSelectedFile(null);
    } catch (error) {
      alert('Erro ao importar arquivo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="importacao-dados-container">
      <div className="card">
        <div className="card-header">
          <span className="icon-import">📥</span>
          <h2>Importar Dados</h2>
          <button className="info-btn" title="Informações">i</button>
        </div>

        <div className="upload-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📄</div>
          <p className="upload-text">Arraste ou selecione um arquivo Excel</p>
          <input
            type="file"
            id="file-input"
            className="file-input"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-label">
            Clique para selecionar
          </label>
        </div>

        {selectedFile && (
          <div className="selected-file">
            <p className="selected-file-text">Arquivo selecionado: {selectedFile.name}</p>
            <button 
              onClick={handleImportar} 
              className="btn-importar"
              disabled={uploading}
            >
              {uploading ? 'Importando...' : 'Importar'}
            </button>
          </div>
        )}

        {importedData && (
          <div className="import-summary">
            <p className="summary-title">Importação Concluída</p>
            <div className="summary-info">
              <div className="summary-row">
                <span className="summary-label">Arquivo:</span>
                <span className="summary-value">{importedData.fileName}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Registros:</span>
                <span className="summary-value">{importedData.rowCount}</span>
              </div>
            </div>
          </div>
        )}

        <div className="import-info">
          <p className="info-text">
            O arquivo deve conter colunas como: Data, Hora, Temperatura, Umidade, Gases, pH
          </p>
        </div>
      </div>
    </div>
  );
}