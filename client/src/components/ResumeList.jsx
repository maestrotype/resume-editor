// src/components/ResumeList.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ResumeList = ({ resumes = [] }) => {
  const { t } = useTranslation();

  if (resumes.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-600 dark:text-gray-300 text-lg">{t('noResumes')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {resumes.map((resume) => (
        <div key={resume.id} className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-2 dark:text-white">{resume.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{resume.summary?.slice(0, 80)}...</p>
          <div className="flex gap-2">
            <Link to={`/resumes/${resume.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md">
              {t('view')}
            </Link>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md">
              {t('delete')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
