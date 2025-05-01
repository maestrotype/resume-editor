import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResumeList() {
  const { t } = useTranslation();
  const API_URL = process.env.REACT_APP_API_URL;
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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300 text-lg">{t('noResumes')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {resumes.map(resume => (
        <div key={resume._id} className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-2 dark:text-white">{resume.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{resume.summary?.slice(0, 80)}...</p>
          <div className="flex gap-2">
            <Link to={`/resumes/${resume._id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md">
              {t('view')}
            </Link>
            <button
              onClick={() => handleDelete(resume._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
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
