import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ data }, ref) => {

  return (
    <div className="preview" ref={ref} id="resume-preview">
      <h2>{data.name}</h2>
      <strong>{data.title}</strong>
      <p>{data.summary}</p>
      <strong>Skills:</strong>
      <ul>
        {data.skills.split(",").map((skill, i) => (
          <li key={i}>{skill.trim()}</li>
        ))}
      </ul>
      <strong>Experience</strong>
      <p>{data.experience}</p>
      <strong>Education</strong>
      <p>{data.education}</p>
      <strong>Contacts</strong>
      <p>{data.contacts}</p>
    </div>
  );
});

export default ResumePreview;
