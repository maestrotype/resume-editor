import React from "react";

function ResumePreview({ data }) {
  return (
    <div className="preview">
      <h2>Превью</h2>
      <h3>{data.name}</h3>
      <h4>{data.title}</h4>
      <p>{data.summary}</p>
      <ul>
        {data.skills.split(",").map((skill, idx) => (
          <li key={idx}>{skill.trim()}</li>
        ))}
      </ul>
      <h2>Опыт работы</h2>
      <p>{data.experience}</p>

      <h2>Образование</h2>
      <p>{data.education}</p>

      <h2>Контакты</h2>
      <p>{data.contacts}</p>
    </div>
  );
}

export default ResumePreview;
