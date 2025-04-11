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
      <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
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
