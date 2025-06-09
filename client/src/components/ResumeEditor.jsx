import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import fileService from "../modules/files/services/fileService";

function ResumeEditor({ data, setData, pdfFormat, setPdfFormat, template }) {
  const { t } = useTranslation();
  const activeFieldRef = useRef(null);
  const [fileKey, setFileKey] = useState(Date.now());

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const autoResize = (el) => {
    if (!el) return;

    if (activeFieldRef.current && activeFieldRef.current !== el) {
      activeFieldRef.current.style.height = "80px";
    }

    activeFieldRef.current = el;

    el.style.transition = "height 0.2s ease";
    el.style.height = "auto";

    requestAnimationFrame(() => {
      const scrollHeight = el.scrollHeight;
      el.style.height = scrollHeight + "px";
    });
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
    const style = document.createElement("style");
    style.innerHTML = `
      textarea {
        transition: height 0.2s ease;
        overflow-y: hidden;
        resize: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
          onClick={(e) => autoResize(e.target)}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("skills")}</label>
        <textarea
          name="skills"
          placeholder={t("skills")}
          value={data.skills || ""}
          onClick={(e) => autoResize(e.target)}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("experience")}</label>
        <textarea
          name="experience"
          placeholder={t("experience")}
          value={data.experience || ""}
          onClick={(e) => autoResize(e.target)}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("education")}</label>
        <textarea
          name="education"
          placeholder={t("education")}
          value={data.education || ""}
          onClick={(e) => autoResize(e.target)}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>{t("contacts")}</label>
        <textarea
          name="contacts"
          placeholder={t("contacts")}
          value={data.contacts || ""}
          onClick={(e) => autoResize(e.target)}
          onChange={handleChange}
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
