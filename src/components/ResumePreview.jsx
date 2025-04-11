import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div className="resume-preview" ref={ref} id="resume-preview">
      <div className="top-bar">
        <span>{data.name}</span>
        <span>{data.title}</span>
      </div>

      <div className="main-header">
        <div className="left-column">
          {data.avatar && <img src={data.avatar} alt="Avatar" className="avatar" />}
        </div>
        <div className="right-column">
          <h1 className="name">{data.name}</h1>
          <h2 className="position">Software Engineer</h2>
          <h3 className="section-title">Professional Experience Overview</h3>
          <ul className="summary">
            {data.summary.split("\n").map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bottom-section">
        <div className="left-block">
          <div className="section">
            <h3 className="section-title">Education</h3>
            <div className="line" />
            <p>{data.education}</p>
          </div>
          <div className="section">
            <h3 className="section-title">Skills</h3>
            <div className="line" />
            <ul className="skills">
              {data.skills.split(",").map((skill, idx) => (
                <li key={idx}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-block">
          <div className="section">
            <h3 className="section-title">Experience</h3>
            <div className="line" />
            <div className="experience" dangerouslySetInnerHTML={{ __html: data.experience }} />
          </div>
        </div>
      </div>

      <div className="footer">
        {data.contacts?.split("\n").map((line, idx) => (
          <span key={idx}>{line}</span>
        ))}
      </div>

    </div>
  );
});

export default ResumePreview;
