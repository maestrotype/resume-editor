// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/header.css";

function Header({ toggleTheme, currentTheme, handlePreviewPDF, handleExportPDF, handleSave }) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);  

  return (
    <header className="header sticky-header">
      <div className="header-left">
        <Link to="/" className="logo">
          ResumeEditor
        </Link>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-link">
            {t('editor')}
          </Link>
          <Link to="/resumes" className="nav-link">
            {t('myResumes')}
          </Link>
          <Link to="/templates" className="nav-link">
            {t('templates')}
          </Link>
        </nav>
        {menuOpen && (
        <button className="menu-close" onClick={toggleMenu} aria-label="Close Menu">
          ❌
        </button>
      )}
      </div>

      <div className={`custom-button ${menuOpen ? 'hidden' : ''}`}>
        <button onClick={toggleTheme} className="icon-button">
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>

        <button onClick={handlePreviewPDF} className="button-primary" >
          {t("previewPDF")}
        </button>

        <button onClick={handleExportPDF} className="action-button fixed-width">
          {t('exportPDF')}
        </button>

        <button onClick={handleSave} className="action-button fixed-width">
          {t('save')}
        </button>

        <button onClick={toggleLanguage} className="icon-button">
          {i18n.language === "en" ? "🇷🇺" : "🇺🇸"}
        </button>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu Toggle">
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
