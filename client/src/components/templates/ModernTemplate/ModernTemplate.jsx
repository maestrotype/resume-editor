import React, { forwardRef } from "react";
import "./ModernTemplate.css";

const ModernTemplate = forwardRef(({ data }, ref) => {
    return (
        <div className="template-modern" ref={ref} id="resume-preview">
            <div className="modern-header">
                <div className="header-left">
                    {data.avatar && (
                        <div className="avatar">
                            <img src={data.avatar} alt="Avatar" className="avatar-img" />
                        </div>
                    )}
                    <div className="personal-info">
                        <h1 className="name">{data.name}</h1>
                        <h3 className="position">{data.position}</h3>
                        <div className="contact-info">
                            <p>{data.contacts}</p>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <h2 className="summary-title">Summary</h2>
                    <p className="summary-text">{data.summary}</p>
                </div>
            </div>

            <div className="modern-content">
                <main className="modern-main">
                    <section className="experience">
                        <h2>Experience</h2>
                        <div className="content-text">{data.experience}</div>
                    </section>

                    <section className="education">
                        <h2>Education</h2>
                        <div className="content-text">{data.education}</div>
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

                    <div className="sidebar-section interests">
                        <h3>Interests</h3>
                        <p>{data.interests}</p>
                    </div>

                    <div className="sidebar-section languages">
                        <h3>Languages</h3>
                        <p>{data.languages}</p>
                    </div>
                </aside>
            </div>
        </div>
    );
});

export default ModernTemplate;
