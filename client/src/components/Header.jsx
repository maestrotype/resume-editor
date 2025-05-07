// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/header.css";
import SVGIcon from "./SVGIcon";

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
      <div className="header-logo">
        <Link to="/" className="logo">
          ResumeGenerator
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
        <div className="menu-toggle" onClick={toggleMenu} aria-label="Menu Toggle">
          <div className={`icon-toggle ${menuOpen ? 'close' : ''}`}></div>
        </div>
      </div>

      {/* <div className={`custom-button ${menuOpen ? 'hidden' : ''}`}> */}
      <div className="custom-button">
        <button
          onClick={toggleTheme}
          className="theme-button"
          title={currentTheme === "light" ? t("darkMode") : t("lightMode")}
        >
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>

        <button
          onClick={handlePreviewPDF}
          className="action-button"
          title={t("previewPDF")}
        >
          <SVGIcon name="preview" />
        </button>

        <button
          onClick={handleExportPDF}
          className="action-button"
          title={t("exportPDF")}
        >
          <SVGIcon name="export" />
        </button>

        <button
          onClick={handleSave}
          className="action-button"
          title={t("save")}
        >
          <SVGIcon name="save" />
        </button>

        <button
          onClick={toggleLanguage}
          className="lang-button"
          title={i18n.language === "en" ? "Русский" : "English"}
        >
          {i18n.language === "en" ? "🇷🇺" : "🇺🇸"}
        </button>
      </div>
    </header>
  );
}

export default Header;
