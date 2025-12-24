import React, { useState } from 'react';
import './RegistroManual.css';

// Componente para o Registro Manual de dados (RF07)
// Responsável pelo registro de pH, testes químicos e observações

export default function RegistroManual() {
  // Estado para armazenar dados do formulário
  const [formData, setFormData] = useState({
    ph: '',
    testeQuimico: 'Teste de Acidez',
    observacoes: ''
  });

  // Manipula mudanças nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manipula o envio do formulário
  const handleSalvar = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.ph.trim()) {
      alert('Por favor, preencha o campo de pH');
      return;
    }

    // Aqui você integra com sua API/banco de dados
    console.log('Dados salvos:', {
      ...formData,
      timestamp: new Date().toISOString()
    });

    // Feedback ao usuário
    alert('Registro salvo com sucesso!');
    
    // Limpa o formulário
    setFormData({
      ph: '',
      testeQuimico: 'Teste de Acidez',
      observacoes: ''
    });
  };

  return (
    <div className="registro-manual-container">
      <div className="card">
        <div className="card-header">
          <span className="icon-drop">💧</span>
          <h2>Registro Manual</h2>
          <button className="info-btn" title="Informações">ℹ</button>
        </div>

        <form onSubmit={handleSalvar} className="form">
          {/* Campo de pH */}
          <div className="form-group">
            <label htmlFor="ph">pH</label>
            <input
              type="number"
              id="ph"
              name="ph"
              value={formData.ph}
              onChange={handleInputChange}
              placeholder="Ex: 6,2"
              step="0.1"
              min="0"
              max="14"
              className="input-field"
            />
          </div>

          {/* Campo Teste Químico */}
          <div className="form-group">
            <label htmlFor="testeQuimico">Teste Químico</label>
            <select
              id="testeQuimico"
              name="testeQuimico"
              value={formData.testeQuimico}
              onChange={handleInputChange}
              className="select-field"
            >
              <option value="Teste de Acidez">Teste de Acidez</option>
              <option value="Teste de Peróxidos">Teste de Peróxidos</option>
              <option value="Teste de Iodo">Teste de Iodo</option>
              <option value="Teste de Fehling">Teste de Fehling</option>
            </select>
          </div>

          {/* Campo Observações */}
          <div className="form-group">
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleInputChange}
              placeholder="Forte odor de fermentação observado nos grãos."
              className="textarea-field"
              rows="4"
            ></textarea>
          </div>

          {/* Botão Salvar */}
          <button type="submit" className="btn-salvar">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}