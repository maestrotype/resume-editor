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
                    <div class="avatar">
                        <img src={data.avatar} alt="img" class="avatar-img" />
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
                </aside>

                <main class="content">
                    <header class="header">
                        <h1>{data.name}</h1>
                        <h2 className="resume-header__position">{data.position}</h2>
                    </header>

                    <section class="experience">
                        <h2>{t("experience")}</h2>
                        <div className="resume-summary">{data.summary}</div>
                    </section>

                    <section class="education">
                        <h2>{t("education")}</h2>
                        <p>{data.education}</p>
                    </section>
                </main>
            </div>
        </div>
    );
});

export default MinimalTemplate;
