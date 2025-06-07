import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import ContactBlock from "../../ContactBlock";
import "./MinimalTemplate.css";

const MinimalTemplate = forwardRef(({ data }, ref) => {
    const { t } = useTranslation();

    return (
        <div className="template-minimal" ref={ref} id="template-minimal">
            <div class="resume">
                <aside class="sidebar">
                    <div className="avatar">
                        <div
                            className="avatar-img"
                            style={{
                                backgroundImage: `url(${data.avatarPreview || data.avatar})`,
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                display: 'block',
                                margin: '0 auto',
                            }}
                        ></div>
                    </div>
                    <section class="personal-info">
                        <h2>{t("personal")}</h2>
                        <p><strong>{t("name")}</strong> {data.name}</p>
                        <ContactBlock contacts={data.contacts} />
                    </section>

                    <section class="skills">
                        <h2>{t("skills")}</h2>
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
                    </section>
                    <section class="education">
                        <h2>{t("education")}</h2>
                        <p>{data.education}</p>
                    </section>
                </aside>
                <main class="content">
                    <header class="header">
                        <h1>{data.name}</h1>
                        <h2 className="resume-header__position">{data.position}</h2>
                    </header>
                    <section class="summary">
                        <h2>{t("summary")}</h2>
                        <div className="resume-summary">{data.summary}</div>
                    </section>
                    <section class="experience">
                        <h2>{t("experience")}</h2>
                        <div className="resume-experience">
                            {data.experience
                                .trim()
                                .split('\n')
                                .reduce((acc, line) => {
                                    const trimmed = line.trim();
                                    const isHeader = /^[A-Z][^\n]+\([^)]+\)$/.test(trimmed);
                                    if (isHeader || acc.length === 0) {
                                        acc.push([trimmed]);
                                    } else {
                                        acc[acc.length - 1].push(trimmed);
                                    }
                                    return acc;
                                }, [])
                                .map((lines, idx) => {
                                    const filtered = lines.filter(l => l !== '');
                                    if (filtered.length < 4) return null;

                                    const [company, period, location, ...desc] = filtered;

                                    return (
                                        <div key={idx} style={{ marginBottom: '1.5em' }}>
                                            <strong>{company}</strong><br />
                                            <em>{period}</em><br />
                                            <span>({location})</span>
                                            <p style={{ marginTop: '0.5em' }}>
                                                {desc.join(' ').replace(/\s+/g, ' ').trim()}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
});

export default MinimalTemplate;
