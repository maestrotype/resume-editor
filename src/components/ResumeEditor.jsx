import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from '../i18n';

function ResumeEditor({ data, setData, pdfFormat, setPdfFormat }) {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const saved = localStorage.getItem("resume-data");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="editor">
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

      <h2 className="section-title">{t("editor")}</h2>

      <label>{t("name")}</label>
      <input
        type="text"
        name="name"
        placeholder={t("name")}
        value={data.name}
        onChange={handleChange}
      />

      <label>{t("title")}</label>
      <input
        type="text"
        name="title"
        placeholder={t("title")}
        value={data.title}
        onChange={handleChange}
      />

      <label>{t("summary")}</label>
      <textarea
        name="summary"
        placeholder={t("summary")}
        value={data.summary}
        onChange={handleChange}
      />

      <label>{t("skills")}</label>
      <textarea
        name="skills"
        placeholder={t("skills")}
        value={data.skills}
        onChange={handleChange}
      />

      <label>{t("experience")}</label>
      <textarea
        name="experience"
        placeholder={t("experience")}
        value={data.experience}
        onChange={handleChange}
      />

      <label>{t("education")}</label>
      <textarea
        name="education"
        placeholder={t("education")}
        value={data.education}
        onChange={handleChange}
      />

      <label>{t("contacts")}</label>
      <textarea
        name="contacts"
        placeholder={t("contacts")}
        value={data.contacts}
        onChange={handleChange}
      />

      <label>{t("avatar")}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setData((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <div className="form-section">
        <label>{t("pdfFormat")}</label>
        <select value={pdfFormat} onChange={(e) => setPdfFormat(e.target.value)}>
          <option value="a4">A4</option>
          <option value="a3">A3</option>
          <option value="letter">Letter</option>
        </select>
      </div>
    </div>
  );
}

export default ResumeEditor;
