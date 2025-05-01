// src/components/ResumeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ResumeDetail() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || "/api";

  useEffect(() => {
    fetch(`${API_URL}/resumes/${id}`)
      .then(response => response.json())
      .then(data => setResume(data))
      .catch(error => console.error("Error loading resume:", error));
  }, [id]);

  if (!resume) {
    return <p className="p-4 text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">{resume.name}</h1>
      <p className="text-lg mb-4 dark:text-gray-300">{resume.title}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-white">Summary</h2>
      <p className="dark:text-gray-300">{resume.summary}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-white">Skills</h2>
      <p className="dark:text-gray-300">{resume.skills}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-white">Experience</h2>
      <p className="dark:text-gray-300">{resume.experience}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-white">Education</h2>
      <p className="dark:text-gray-300">{resume.education}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-white">Contacts</h2>
      <p className="dark:text-gray-300">{resume.contacts}</p>
    </div>
  );
}

export default ResumeDetail;
