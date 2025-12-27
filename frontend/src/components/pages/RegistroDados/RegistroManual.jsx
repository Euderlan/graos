import React, { useState } from 'react';
import { MdWater, MdInfoOutline } from 'react-icons/md';
import './RegistroManual.css';

export default function RegistroManual({ onRegistroSalvo }) {
  const [formData, setFormData] = useState({
    ph: '',
    testeQuimico: 'Teste de Acidez',
    observacoes: '',
    grupo: 'Controle'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    
    if (!formData.ph.trim()) {
      alert('Por favor, preencha o campo de pH');
      return;
    }

    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novoRegistro = {
      ...formData,
      data,
      hora,
      timestamp: new Date().toISOString()
    };

    if (onRegistroSalvo) {
      onRegistroSalvo(novoRegistro);
    }

    alert('Registro salvo com sucesso!');
    
    setFormData({
      ph: '',
      testeQuimico: 'Teste de Acidez',
      observacoes: '',
      grupo: 'Controle'
    });
  };

  return (
    <div className="registro-manual-container">
      <div className="card">
        <div className="card-header">
          <MdWater className="icon-drop" />
          <h2>Registro Manual</h2>
          <button className="info-btn" title="Informações">
            <MdInfoOutline />
          </button>
        </div>

        <form onSubmit={handleSalvar} className="form">
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

          <div className="form-group">
            <label htmlFor="grupo">Grupo Experimental</label>
            <select
              id="grupo"
              name="grupo"
              value={formData.grupo}
              onChange={handleInputChange}
              className="select-field"
            >
              <option value="Controle">Controle</option>
              <option value="Umidade Alta">Umidade Alta</option>
              <option value="Temperatura Alta">Temperatura Alta</option>
              <option value="Extremo">Extremo</option>
            </select>
          </div>

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

          <button type="submit" className="btn-salvar">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}