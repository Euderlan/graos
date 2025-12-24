import React from 'react';
import './FiltersSection.css';

export default function FiltersSection({ filters, onFilterChange }) {
  const formatarData = (data = new Date()) => {
    return data.toLocaleString('pt-BR');
  };

  return (
    <div className="filters-section">
      {/* Filtro Produto */}
      <div className="filter-group">
        <label htmlFor="produto">Produto</label>
        <select
          id="produto"
          value={filters.produto}
          onChange={(e) => onFilterChange('produto', e.target.value)}
          className="filter-select"
        >
          <option value="SOJA">SOJA</option>
          <option value="FEIJAO">FEIJÃO</option>
          <option value="MILHO">MILHO</option>
          <option value="ARROZ">ARROZ</option>
        </select>
      </div>

      {/* Filtro Grupo Experimental */}
      <div className="filter-group">
        <label htmlFor="grupo">Grupo Experimental</label>
        <select
          id="grupo"
          value={filters.grupoExperimental}
          onChange={(e) => onFilterChange('grupoExperimental', e.target.value)}
          className="filter-select"
        >
          <option value="Controle">Controle</option>
          <option value="Umidade Alta">Umidade Alta</option>
          <option value="Temperatura Alta">Temperatura Alta</option>
          <option value="Extremo">Extremo</option>
        </select>
      </div>

      {/* Filtro Período */}
      <div className="filter-group">
        <label htmlFor="periodo">Período</label>
        <select
          id="periodo"
          value={filters.periodo}
          onChange={(e) => onFilterChange('periodo', e.target.value)}
          className="filter-select"
        >
          <option value="ultimas-2-semanas">Últimas 2 Semanas</option>
          <option value="ultimo-mes">Último Mês</option>
          <option value="ultimos-3-meses">Últimos 3 Meses</option>
          <option value="todo-periodo">Todo Período</option>
        </select>
      </div>

      {/* Informação de Atualização */}
      <div className="atualizado-info">
        Atualizado em: <span>{formatarData()}</span>
      </div>
    </div>
  );
}