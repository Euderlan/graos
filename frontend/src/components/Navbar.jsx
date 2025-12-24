import React, { useState } from 'react';
import './Navbar.css';

// Componente de Navegação - Sidebar com menu
// Permite navegar entre as diferentes telas

export default function Navbar({ currentPage, onNavigate }) {
  // Estado para controlar se o menu está aberto (mobile)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Alterna abertura/fechamento do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fecha o menu ao navegar
  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  // Menu items com ícones e labels
  const menuItems = [
    { id: 'dados', label: 'Registro de Dados', icon: '📋' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'sensores', label: 'Status Sensores', icon: '📡' },
    { id: 'configuracao', label: 'Configuração', icon: '⚙️' }
  ];

  return (
    <>
      {/* Botão de Menu (Mobile) */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Sidebar */}
      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        {/* Logo/Header */}
        <div className="navbar-header">
          <span className="navbar-icon">🌾</span>
          <h1 className="navbar-title">Monitoramento de Grãos</h1>
        </div>

        {/* Menu Items */}
        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`navbar-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="navbar-item-icon">{item.icon}</span>
                <span className="navbar-item-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer Info */}
        <div className="navbar-footer">
          <p className="version">v1.0.0</p>
          <p className="info">Sistema acadêmico de monitoramento</p>
        </div>
      </nav>

      {/* Overlay (Mobile) */}
      {isMenuOpen && (
        <div className="navbar-overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
}