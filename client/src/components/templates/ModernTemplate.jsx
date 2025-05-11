import React, { forwardRef } from "react";

const ModernTemplate = forwardRef(({ data }, ref) => {
  return (
    <div className="template-modern">
      <h1>{data.name}</h1>
      <h3>{data.position}</h3>
      <p>{data.summary}</p>
      <div>
        <h4>Experience</h4>
        <p>{data.experience}</p>
      </div>
      <div>
        <h4>Skills</h4>
        <p>{data.skills}</p>
      </div>
    </div>
  );
});

export default ModernTemplate;
