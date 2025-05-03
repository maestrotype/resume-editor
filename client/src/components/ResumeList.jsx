import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/resume-list.css";

function ResumeList() {
  const { t } = useTranslation();
  const API_URL = process.env.REACT_APP_API_URL || "/api";
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = () => {
    fetch(`${API_URL}/resumes`)
      .then(response => response.json())
      .then(data => setResumes(data))
      .catch(error => console.error("Error loading resumes:", error));
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete') || "Are you sure you want to delete this resume?")) return;

    try {
      const response = await fetch(`${API_URL}/resumes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setResumes(resumes.filter(resume => resume._id !== id));
      } else {
        console.error("Failed to delete resume");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  if (resumes.length === 0) {
    return (
      <div className="resume-empty">
        <p>{t('noResumes')}</p>
      </div>
    );
  }

  return (
    <div className="resume-list">
      {resumes.map(resume => (
        <div key={resume._id} className="resume-card">
          <h2 className="resume-title">{resume.name}</h2>
          <p className="resume-summary">{resume.summary?.slice(0, 80)}...</p>
          <div className="resume-actions">
            <Link to={`/resumes/${resume._id}`} className="btn btn-view">
              {t('view')}
            </Link>
            <button
              onClick={() => handleDelete(resume._id)}
              className="btn btn-delete"
            >
              {t('delete')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResumeList;
