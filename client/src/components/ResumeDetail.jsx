import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/resume-detail.css";

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
    return <p className="resume-detail__loading">Loading...</p>;
  }

  return (
    <div className="resume-detail">
      <h1 className="resume-detail__name">{resume.name}</h1>
      <p className="resume-detail__title">{resume.title}</p>

      <h2 className="resume-detail__section-title">Summary</h2>
      <p className="resume-detail__text">{resume.summary}</p>

      <h2 className="resume-detail__section-title">Skills</h2>
      <p className="resume-detail__text">{resume.skills}</p>

      <h2 className="resume-detail__section-title">Experience</h2>
      <p className="resume-detail__text">{resume.experience}</p>

      <h2 className="resume-detail__section-title">Education</h2>
      <p className="resume-detail__text">{resume.education}</p>

      <h2 className="resume-detail__section-title">Contacts</h2>
      <p className="resume-detail__text">{resume.contacts}</p>
    </div>
  );
}

export default ResumeDetail;
