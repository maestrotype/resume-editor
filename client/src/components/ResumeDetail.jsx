// src/components/ResumeDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResumeDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        {t('resumeDetailTitle')} #{id}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        {t('resumeDetailDescription')}
      </p>
    </div>
  );
};

export default ResumeDetail;