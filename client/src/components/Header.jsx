// Новый src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/header.css";

function Header({ toggleTheme, currentTheme, handleExportPDF, handleSave }) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header sticky-header">
      <div className="logo">ResumeEditor</div>
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>{t('editor')}</Link>
        <Link to="/resumes" onClick={() => setMenuOpen(false)}>{t('myResumes')}</Link>
        <Link to="/templates" onClick={() => setMenuOpen(false)}>{t('templates')}</Link>
      </nav>
      <div className="header-buttons">
        <button onClick={toggleTheme} className="icon-button" aria-label="Toggle Theme">
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>
        <button onClick={toggleLanguage} className="icon-button" aria-label="Toggle Language">
          {i18n.language === "en" ? "🇷🇺" : "🇺🇸"}
        </button>
        <button onClick={handleExportPDF} className="action-button">
          {t('exportPDF')}
        </button>
        <button onClick={handleSave} className="action-button save-button">
          {t('save')}
        </button>
        <button className="burger" onClick={toggleMenu}>
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>
    </header>
  );
}

export default Header;
