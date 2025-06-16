import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { parseExperience } from "../../../utils/parseExperience";
import "./ModernTemplate.css";

const ModernTemplate = forwardRef(({ data }, ref) => {
    const { t } = useTranslation();
    return (
        <div className="template-modern" ref={ref} id="resume-preview">
            <div className="modern-header">
                <div className="header-left">
                    {data.avatar && (
                        <div className="avatar">
                            <img src={data.avatarPreview || data.avatarPreview || data.avatar} alt="Avatar" className="avatar-img" />
                        </div>
                    )}
                </div>
                <div className="header-right">
                    <div className="personal-info">
                        <h1 className="name">{data.name}</h1>
                        <h2 className="position">{data.position}</h2>
                        <h3>Education</h3>
                        <div className="content-text">{data.education}</div>
                        <div className="contact-info">
                            <p>{data.contacts}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modern-content">
                <main className="modern-main">
                    <section className="summary">
                        <h2 className="summary-title">Summary</h2>
                        <p className="summary-text">{data.summary}</p>
                    </section>
                    <section className="experience">
                        <h3>{t("experience")}</h3>
                        <div className="resume-experience">
                            {parseExperience(data.experience).map(({ company, period, location, desc }, idx) => (
                                <div key={idx} className="company-experience">
                                    <strong>{company}</strong><br />
                                    <em>{period}</em><br />
                                    <span>({location})</span>
                                    <p style={{ marginTop: '0.5em' }}>
                                        {desc.join(' ').replace(/\s+/g, ' ').trim()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="education">

                    </section>
                </main>

                <aside className="modern-sidebar">
                    <div className="sidebar-section skills">
                        <h3>Skills</h3>
                        <ul>
                            {data.skills
                                .split("\n")
                                .filter((skill) => skill.trim())
                                .map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                        </ul>
                    </div>

                    {/* <div className="sidebar-section interests">
                        <h3>Interests</h3>
                        <p>{data.interests}</p>
                    </div>

                    <div className="sidebar-section languages">
                        <h3>Languages</h3>
                        <p>{data.languages}</p>
                    </div> */}
                </aside>
            </div>
        </div>
    );
});

export default ModernTemplate;
