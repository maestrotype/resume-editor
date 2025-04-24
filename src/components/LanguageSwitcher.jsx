import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <div className="language-switcher">
            <button className={i18n.language === "ru" ? "active" : ""} onClick={() => i18n.changeLanguage("ru")} title="Русский" style={{ background: "none", border: "none", cursor: "pointer", padding: "5px" }}>
                <svg width="24" height="16" viewBox="0 0 24 16">
                    <rect width="24" height="5.33" fill="#fff" />
                    <rect y="5.33" width="24" height="5.33" fill="#0033a0" />
                    <rect y="10.66" width="24" height="5.33" fill="#d52b1e" />
                </svg>
            </button>
            <button className={i18n.language === "en" ? "active" : ""} onClick={() => i18n.changeLanguage("en")} title="English" style={{ background: "none", border: "none", cursor: "pointer", padding: "5px" }}>
                <svg width="24" height="16" viewBox="0 0 24 16">
                    <rect width="24" height="16" fill="#00247d" />
                    <path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" strokeWidth="3" />
                    <path d="M0,0 L24,16 M24,0 L0,16" stroke="#cf142b" strokeWidth="1.5" />
                    <rect x="9" width="6" height="16" fill="#fff" />
                    <rect y="5" width="24" height="6" fill="#fff" />
                    <rect x="10" width="4" height="16" fill="#cf142b" />
                    <rect y="6" width="24" height="4" fill="#cf142b" />
                </svg>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
