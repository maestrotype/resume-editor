import React, { forwardRef } from "react";

const MinimalTemplate = forwardRef(({ data }, ref) => {
  return (
    <div className="template-minimal">
      <h2>{data.name}</h2>
      <p>{data.summary}</p>
      <div>
        <h4>Skills</h4>
        <p>{data.skills}</p>
      </div>
    </div>
  );
});

export default MinimalTemplate;
