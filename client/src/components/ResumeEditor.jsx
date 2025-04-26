import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import html2pdf from "html2pdf.js";


function ResumeEditor({ data, setData, pdfFormat, setPdfFormat, previewRef }) {

  const { t } = useTranslation();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSaveToDatabase = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ошибка сохранения резюме");
      }

      const result = await response.json();
      console.log("Resume save is success:", result);
      alert(t("resumeSaveSuccess"));
    } catch (error) {
      console.error("❌ Error save:", error);
      alert(t("resumeSaveError"));
    }
  };

  const handleDownloadPDF = () => {
    if (!previewRef.current) {
      console.error("Preview element not found");
      return;
    }

    const element = previewRef.current.cloneNode(true);

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/styles-pdf.css";
    element.insertBefore(styleLink, element.firstChild);

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "My_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: pdfFormat, orientation: "portrait" },
      })
      .save();
  };

  const handlePreviewPDF = () => {
    if (!previewRef.current) return;

    const win = window.open("", "_blank");
    const html = `
      <html>
        <head>
          <link rel="stylesheet" href="/styles-pdf.css" />
        </head>
        <body>
          ${previewRef.current.outerHTML}
        </body>
      </html>
    `;
    win.document.write(html);
    win.document.close();
  };

  useEffect(() => {
    const saved = localStorage.getItem("resume-data");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="editor">
      {/* <div className="header-editor">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? `🌙 ${t("darkMode")}` : `☀️ ${t("lightMode")}`}
        </button>

        <LanguageSwitcher />
      </div> */}
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
      <div className="button-group">
        <button className="button-primary" onClick={handlePreviewPDF}>
          {t("previewPDF")}
        </button>
        <button className="button-primary" onClick={handleDownloadPDF}>
          {t("exportPDF")}
        </button>
        <button className="button-primary" onClick={handleSaveToDatabase}>
          {t("saveToDatabase")}
        </button>

      </div>
    </div>
  );
}

export default ResumeEditor;
