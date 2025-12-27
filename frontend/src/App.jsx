import React, { useState } from 'react';
import Navbar from './components/Navbar';
import RegistroDados from './components/pages/RegistroDados/RegistroDados';
import Dashboard from './components/pages/Dashboard/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dados');

  const renderPage = () => {
    switch (currentPage) {
      case 'dados':
        return (
          <div className="page-container">
            <RegistroDados />
          </div>
        );

      case 'dashboard':
        return (
          <div className="page-container">
            <Dashboard />
          </div>
        );

      case 'sensores':
        return (
          <div className="page-container">
            <div className="placeholder-card">
              <h2>Status dos Sensores</h2>
              <p>Página em desenvolvimento...</p>
            </div>
          </div>
        );

      case 'configuracao':
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
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;