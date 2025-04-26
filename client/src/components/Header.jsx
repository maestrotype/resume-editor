import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header({ toggleTheme, currentTheme, handleExportPDF, handleSave }) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ru" : "en");
  };

  return (
    <header className="w-full flex flex-wrap items-center justify-between p-4 shadow-md bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          ResumeEditor
        </Link>
        <nav className="hidden md:flex gap-4">
          <Link to="/" className="hover:underline">
            {t('editor')}
          </Link>
          <Link to="/resumes" className="hover:underline">
            {t('myResumes')}
          </Link>
          <Link to="/templates" className="hover:underline">
            {t('templates')}
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="p-2">
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>

        <button onClick={toggleLanguage} className="p-2">
          {i18n.language === "en" ? "🇷🇺" : "🇺🇸"}
        </button>

        <button onClick={handleExportPDF} className="bg-blue-500 text-white px-3 py-1 rounded-md">
          {t('exportPDF')}
        </button>

        <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded-md">
          {t('save')}
        </button>
      </div>

      {/* Mobile menu */}
      <nav className="flex w-full justify-around mt-2 md:hidden">
        <Link to="/" className="hover:underline">
          {t('editor')}
        </Link>
        <Link to="/resumes" className="hover:underline">
          {t('myResumes')}
        </Link>
        <Link to="/templates" className="hover:underline">
          {t('templates')}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
