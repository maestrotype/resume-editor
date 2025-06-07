import React, { forwardRef } from "react";
import ContactBlock from "../../ContactBlock";
import "./ClassicTemplate.css";
import { parseExperience } from "../../../utils/parseExperience";

const ClassicTemplate = forwardRef(({ data }, ref) => {
    return (
        <div className="resume-preview" ref={ref} id="resume-preview">
            <div className="top-bar">
                <span>{data.name}</span>
                <span>{data.title}</span>
            </div>

            <div className="resume-header">
                <div className="resume-header__top">
                    <div className="resume-header__avatar">
                        {data.avatar && <img src={data.avatarPreview || data.avatar} alt="Avatar" className="resume-header__avatar-img" />}
                    </div>
                    <div className="resume-header__info">
                        <h1 className="resume-header__name">{data.name}</h1>
                        <h2 className="resume-header__position">{data.position}</h2>
                    </div>
                </div>
                <div className="resume-header__summary">
                    <div className="resume-header__section-title">Professional Experience Overview</div>
                    <div className="resume-summary">{data.summary}</div>
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
                        <div className="skills-list">
                            {data.skills
                                .split("\n")
                                .filter((line) => line.trim() !== "") // убираем пустые строки
                                .map((line, idx) =>
                                    line.includes(":") ? (
                                        <div key={idx} className="skill-heading">{line.trim()}</div>
                                    ) : (
                                        <div key={idx} className="skill-item">{line.trim()}</div>
                                    )
                                )}
                        </div>
                    </div>
                </div>

                <div className="resume-column resume-right">
                    <div className="resume-divider"></div>
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
                <ContactBlock contacts={data.contacts} />
                {/* {data.contacts?.split("\n").map((line, idx) => (
            <span key={idx}>{line}</span>
          ))} */}
            </div>
        </div>
    );
});

export default ClassicTemplate;
