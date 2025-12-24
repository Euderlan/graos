import React, { useState } from 'react';
import './GaleriaFotos.css';

// Componente para Galeria de Fotos (RF08)
// Permite associar fotos diárias às medições correspondentes

export default function GaleriaFotos() {
  // Estado para gerenciar fotos
  const [fotos, setFotos] = useState([
    {
      id: 1,
      data: '19/04/2024',
      grupo: 'Umidade Alta',
      src: null,
      preview: null
    },
    {
      id: 2,
      data: '18/04/2024',
      grupo: 'Controle',
      src: null,
      preview: null
    },
    {
      id: 3,
      data: '17/04/2024',
      grupo: 'Temperatura Alta',
      src: null,
      preview: null
    }
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  // Manipula o upload de arquivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem válida');
        return;
      }

      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Arquivo muito grande. Máximo 5MB');
        return;
      }

      setSelectedFile(file);
    }
  };

  // Manipula o drag and drop
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

  // Envia a foto
  const handleEnviarFoto = () => {
    if (!selectedFile) {
      alert('Por favor, selecione uma imagem');
      return;
    }

    // Simula upload
    const reader = new FileReader();
    reader.onload = (event) => {
      // Adiciona a foto à galeria
      const novaFoto = {
        id: Date.now(),
        data: new Date().toLocaleDateString('pt-BR'),
        grupo: 'Grupo Atual',
        src: event.target.result,
        preview: event.target.result
      };

      setFotos([novaFoto, ...fotos]);
      setSelectedFile(null);
      alert('Foto enviada com sucesso!');
    };
    reader.readAsDataURL(selectedFile);
  };

  // Abre a galeria completa
  const handleVerTodasFotos = () => {
    alert('Abrir galeria completa com ' + fotos.length + ' fotos');
  };

  return (
    <div className="galeria-fotos-container">
      <div className="card">
        <div className="card-header">
          <span className="icon-photo">📷</span>
          <h2>Galeria de Fotos</h2>
          <button className="info-btn" title="Informações">ℹ</button>
        </div>

        {/* Área de Upload */}
        <div className="upload-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">☁️</div>
          <p className="upload-text">Arraste ou selecione uma imagem para enviar</p>
          <input
            type="file"
            id="file-input"
            className="file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="file-label">
            Clique para selecionar
          </label>
        </div>

        {/* Preview da imagem selecionada */}
        {selectedFile && (
          <div className="preview-container">
            <p className="preview-text">Arquivo selecionado: {selectedFile.name}</p>
            <button onClick={handleEnviarFoto} className="btn-enviar">
              Enviar Foto
            </button>
          </div>
        )}

        {/* Galeria de Miniaturas */}
        <div className="gallery-grid">
          {fotos.map((foto) => (
            <div key={foto.id} className="gallery-item">
              {foto.src ? (
                <img src={foto.src} alt={`Foto de ${foto.data}`} className="gallery-image" />
              ) : (
                <div className="gallery-placeholder">
                  <span className="placeholder-icon">📸</span>
                </div>
              )}
              <p className="gallery-date">{foto.data}</p>
            </div>
          ))}
        </div>

        {/* Link para ver todas as fotos */}
        <div className="gallery-footer">
          <button onClick={handleVerTodasFotos} className="btn-ver-todas">
            Ver todas as fotos
          </button>
        </div>
      </div>
    </div>
  );
}