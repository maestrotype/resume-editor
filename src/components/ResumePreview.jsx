import React, { forwardRef } from "react";

const ResumePreview = forwardRef(({ data }, ref) => {
  return (
    <div className="wrapper">
      <div className="resume-preview" ref={ref} id="resume-preview">
        <div className="top-bar">
          <span>{data.name}</span>
          <span>{data.title}</span>
        </div>

        <div className="resume-header">
          <div className="resume-header__top">
            <div className="resume-header__avatar">
              {data.avatar && <img src={data.avatar} alt="Avatar" className="resume-header__avatar-img" />}
            </div>
            <div className="resume-header__info">
              <h1 className="resume-header__name">{data.name}</h1>
              <h2 className="resume-header__position">Software Engineer</h2>
            </div>
          </div>
          <div className="resume-header__summary">
            <h3 className="resume-header__section-title">Professional Experience Overview</h3>
            <ul className="resume-header__summary-list">
              {data.summary.split("\n").map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="resume-layout">
          <div className="resume-column resume-left">
            <div className="resume-section resume-education">
              <h3 className="section-heading">Education</h3>
              <div className="section-divider"></div>
              <p>{data.education}</p>
            </div>

            <div className="resume-section resume-skills">
              <h3 className="section-heading">Skills</h3>
              <div className="section-divider"></div>
              <ul className="skills-list">
                {data.skills.split(',').map((skill, idx) => (
                  <li key={idx} className="skill-item">{skill.trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="resume-divider"></div>

          <div className="resume-column resume-right">
            <div className="resume-section resume-experience">
              <h3 className="section-heading">Experience</h3>
              <div className="section-divider"></div>
              <div
                className="experience-content"
                dangerouslySetInnerHTML={{ __html: data.experience }}
              />
            </div>
          </div>
        </div>

        <div className="footer">
          {data.contacts?.split("\n").map((line, idx) => (
            <span key={idx}>{line}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
