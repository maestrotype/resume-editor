import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div className="preview" ref={ref} id="resume-preview">
      <header className="preview-header">
        <h1>{data.name}</h1>
        <h2>{data.title}</h2>
        <p>{data.contacts}</p>
      </header>

      <section className="preview-section">
        <h3>Summary</h3>
        <p>{data.summary}</p>
      </section>

      <section className="preview-section">
        <h3>Skills</h3>
        <ul>
          {data.skills.split(",").map((skill, i) => (
            <li key={i}>{skill.trim()}</li>
          ))}
        </ul>
      </section>

      <section className="preview-section">
        <h3>Experience</h3>
        <p>{data.experience}</p>
      </section>

      <section className="preview-section">
        <h3>Education</h3>
        <p>{data.education}</p>
      </section>
    </div>
  );
});

export default ResumePreview;
