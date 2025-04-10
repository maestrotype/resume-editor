import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div className="resume-preview" ref={ref} id="resume-preview">
      <div className="header">
        <div className="avatar">
          {data.avatar && (
            <img src={data.avatar} alt="Avatar" />
          )}
        </div>
        <div className="contact-info">
          <h1>{data.name}</h1>
          <h2>{data.title}</h2>
          <p>{data.contacts}</p>
        </div>
      </div>

      <div className="section">
        <h3>Summary</h3>
        <div className="line" />
        <p>{data.summary}</p>
      </div>

      <div className="section">
        <h3>Skills</h3>
        <div className="line" />
        <ul>
          {data.skills.split(",").map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Experience</h3>
        <div className="line" />
        <p>{data.experience}</p>
      </div>

      <div className="section">
        <h3>Education</h3>
        <div className="line" />
        <p>{data.education}</p>
      </div>
    </div>
  );
});

export default ResumePreview;
