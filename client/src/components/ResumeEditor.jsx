import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import fileService from "../modules/files/services/fileService";

function ResumeEditor({ data, setData, pdfFormat, setPdfFormat, template }) {
  const { t } = useTranslation();
  const [fileKey, setFileKey] = useState(Date.now());

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // First convert to base64 for preview
        const base64 = await fileService.fileToBase64(file);
        
        // Upload to server
        const response = await fileService.uploadAvatar(file);
        if (response.success) {
          // Use server path for storage, but base64 for immediate preview
          setData(prev => ({ 
            ...prev, 
            avatar: response.avatarPath,
            avatarPreview: base64 // Use for immediate preview
          }));
        }
        
        setFileKey(Date.now()); // Reset file input after successful upload
      } catch (error) {
        console.error('File handling error:', error);
      }
    }
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
      <div className="form-group">
        <label>{t("name")}</label>
        <input
          type="text"
          name="name"
          placeholder={t("name")}
          value={data.name || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>{t("title")}</label>
        <input
          type="text"
          name="title"
          placeholder={t("title")}
          value={data.title || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>{t("position")}</label>
        <input
          type="text"
          name="position"
          placeholder={t("position")}
          value={data.position || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>{t("summary")}</label>
        <textarea
          name="summary"
          placeholder={t("summary")}
          value={data.summary || ""}
          onChange={(e) => {
            handleChange(e);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("skills")}</label>
        <textarea
          name="skills"
          placeholder={t("skills")}
          value={data.skills || ""}
          onChange={(e) => {
            handleChange(e);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("experience")}</label>
        <textarea
          name="experience"
          placeholder={t("experience")}
          value={data.experience || ""}
          onChange={(e) => {
            handleChange(e);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("education")}</label>
        <textarea
          name="education"
          placeholder={t("education")}
          value={data.education || ""}
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
          value={data.contacts || ""}
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
          key={fileKey}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <div className="form-section">
        <label>{t("pdfFormat")}</label>
        <select 
          value={pdfFormat || "a4"} 
          onChange={(e) => setPdfFormat(e.target.value)}
        >
          <option value="a4">A4</option>
          <option value="a3">A3</option>
          <option value="a2">A2</option>
          <option value="a1">A1</option>
          <option value="letter">Letter</option>
        </select>
      </div>
    </div>
  );
}

export default ResumeEditor;
