import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RegistroManual from './components/pages/RegistroDados/RegistroManual';
import GaleriaFotos from './components/pages/RegistroDados/GaleriaFotos';
import ExportacaoDados from './components/pages/RegistroDados/ExportacaoDados';
import HistoricoRegistros from './components/pages/RegistroDados/HistoricoRegistros';
import Dashboard from './components/pages/Dashboard/Dashboard';
import './App.css';

// Componente principal da aplicação
// Gerencia navegação entre páginas e renderização de conteúdo

function App() {
  // Estado para controlar qual página está sendo exibida
  const [currentPage, setCurrentPage] = useState('dados');

  // Renderiza a página apropriada baseada no estado
  const renderPage = () => {
    switch (currentPage) {
      case 'dados':
        // Página de Registro de Dados (Tela 1)
        return (
          <div className="page-container">
            <div className="page-row">
              <div className="page-section">
                <RegistroManual />
              </div>
              <div className="page-section">
                <GaleriaFotos />
              </div>
            </div>
            <div className="page-row">
              <div className="page-section">
                <ExportacaoDados />
              </div>
              <div className="page-section">
                <HistoricoRegistros />
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        // Página Dashboard (Tela 2)
        return (
          <div className="page-container">
            <Dashboard />
          </div>
        );

      case 'sensores':
        // Página Status Sensores (futura)
        return (
          <div className="page-container">
            <div className="placeholder-card">
              <h2>Status dos Sensores</h2>
              <p>Página em desenvolvimento...</p>
            </div>
          </div>
        );

      case 'configuracao':
        // Página Configuração (futura)
        return (
          <div className="page-container">
            <div className="placeholder-card">
              <h2>Configurações do Sistema</h2>
              <p>Página em desenvolvimento...</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="page-container">
            <div className="placeholder-card">
              <h2>Página Não Encontrada</h2>
              <p>A página solicitada não existe.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      {/* Componente de Navegação */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Conteúdo Principal */}
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;