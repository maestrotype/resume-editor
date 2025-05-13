import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import "./MinimalTemplate.css";

const MinimalTemplate = forwardRef(({ data }, ref) => {
    const { t } = useTranslation();

    return (
        <div className="template-minimal">
            <div class="resume">
                <aside class="sidebar">
                    <div class="avatar">
                        <img src={data.avatar} alt="img" class="avatar-img" />
                    </div>
                    <section class="personal-info">
                        <h2>{t("personal")}</h2>
                        <p><strong>{t("name")}</strong> {data.name}</p>
                        <p><strong>Адреса:</strong> вул. Наукова 15, 123, 01023 Київ</p>
                        <p><strong>Номер телефону:</strong> +380 325 15 25</p>
                        <p>example@gmail.com</p>
                    </section>

                    <section class="skills">
                        <h2>Навички</h2>
                        <ul>
                            <li>Презентація: Дуже добре</li>
                            <li>Комунікація: Добре</li>
                            <li>Організація: Добре</li>
                            <li>Співробітництво: Добре</li>
                        </ul>
                    </section>

                    <section class="interests">
                        <h2>Інтереси</h2>
                        <ul>
                            <li>Міжнародний бізнес</li>
                            <li>Політика</li>
                            <li>Волонтерство</li>
                        </ul>
                    </section>

                    <section class="languages">
                        <h2>Мови</h2>
                        <ul>
                            <li>Українська: Рідна мова</li>
                            <li>Англійська: Середній рівень</li>
                            <li>Німецька: Середній рівень</li>
                        </ul>
                    </section>
                </aside>

                <main class="content">
                    <header class="header">
                        <h1>{data.name}</h1>
                        <p>Добросовісний та амбітний випускник з досвідом роботи з персоналом...</p>
                    </header>

                    <section class="experience">
                        <h2>Досвід роботи</h2>
                        <article>
                            <h3>Асистент по роботі з персоналом</h3>
                            <p><em>McDonalds, Київ</em> (січ 2019 - вер 2019)</p>
                            <ul>
                                <li>Координація опитувань щодо рівня задоволеності співробітників</li>
                                <li>Допомога командам у проведенні досліджень</li>
                            </ul>
                        </article>

                        <article>
                            <h3>Помічник координатора волонтер</h3>
                            <p><em>Волонтери України, Київ</em> (чер 2018 - груд 2018)</p>
                            <p>Допомога у сфері волонтерства...</p>
                        </article>
                    </section>

                    <section class="education">
                        <h2>Освіта і кваліфікації</h2>
                        <p>Бакалавр психології та бізнес менеджменту - Львівська політехніка</p>
                    </section>

                    <section class="recommendations">
                        <h2>Рекомендації</h2>
                        <p>Рекомендації надаються за запитом.</p>
                    </section>
                </main>
            </div>
        </div>
    );
});

export default MinimalTemplate;
