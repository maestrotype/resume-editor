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
                    <h2 className="summary-title">Особисті дані</h2>
                    <p className="summary-text">{data.summary}</p>
                </div>
            </div>

            <div className="modern-content">
                <div className="main-content">
                    <section className="section work-experience">
                        <h2>Досвід роботи</h2>
                        <div className="experience-content" dangerouslySetInnerHTML={{ __html: data.experience }} />
                    </section>

                    <section className="section education">
                        <h2>Освіта і кваліфікації</h2>
                        <p>{data.education}</p>
                    </section>

                    <section className="section recommendations">
                        <h2>Рекомендації</h2>
                        <p>{data.recommendations || "Рекомендації надаються за запитом."}</p>
                    </section>
                </div>

                <aside className="modern-sidebar">
                    <div className="sidebar-section personal-details">
                        <h3>Особисті дані</h3>
                        <p>Ім’я: {data.name}</p>
                        <p>Адреса: {data.address}</p>
                        <p>Телефон: {data.phone}</p>
                        <p>Email: {data.email}</p>
                    </div>

                    <div className="sidebar-section skills">
                        <h3>Навички</h3>
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
                        <h3>Інтереси</h3>
                        <p>{data.interests}</p>
                    </div>

                    <div className="sidebar-section languages">
                        <h3>Мови</h3>
                        <p>{data.languages}</p>
                    </div>
                </aside>
            </div>
        </div>
    );
});

export default ModernTemplate;
