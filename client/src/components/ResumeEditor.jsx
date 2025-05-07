import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function ResumeEditor({ data, setData, pdfFormat, setPdfFormat, previewRef }) {

  const { t } = useTranslation();

  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

      <label>{t("position")}</label>
      <input
        type="text"
        name="position"
        placeholder={t("position")}
        value={data.position}
        onChange={handleChange}
      />

      <label>{t("summary")}</label>
      <textarea
        name="summary"
        placeholder={t("summary")}
        value={data.summary}
        onChange={(e) => {
          handleChange(e);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows="3"
      />


      <label>{t("skills")}</label>
      <textarea
        name="skills"
        placeholder={t("skills")}
        value={data.skills}
        onChange={(e) => {
          handleChange(e);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows="3"
      />


      <label>{t("experience")}</label>
      <textarea
        name="experience"
        placeholder={t("experience")}
        value={data.experience}
        onChange={(e) => {
          handleChange(e);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        rows="3"
      />
      <div className="form-group">
        <label>{t("education")}</label>
        <textarea
          name="education"
          placeholder={t("education")}
          value={data.education}
          onChange={(e) => {
            handleChange(e);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("contacts")}</label>
        <textarea
          name="contacts"
          placeholder={t("contacts")}
          value={data.contacts}
          onChange={(e) => {
            handleChange(e);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows="3"
        />
      </div>

      <label className="file-label">
        📎 {t("avatar")}
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
      </label>
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
