import React, { useEffect } from "react";

function ResumeEditor({ data, setData }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const saved = localStorage.getItem("resume-data");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("resume-data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="editor">
      <h2>Редактор</h2>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={data.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="Должность"
        value={data.title}
        onChange={handleChange}
      />
      <textarea
        name="summary"
        placeholder="О себе"
        value={data.summary}
        onChange={handleChange}
      />
      <textarea
        name="skills"
        placeholder="Навыки (через запятую)"
        value={data.skills}
        onChange={handleChange}
      />
      <textarea
        name="experience"
        placeholder="Опыт работы"
        value={data.experience}
        onChange={handleChange}
      />

      <textarea
        name="education"
        placeholder="Образование"
        value={data.education}
        onChange={handleChange}
      />

      <textarea
        name="contacts"
        placeholder="Контакты (email, телефон, LinkedIn)"
        value={data.contacts}
        onChange={handleChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setData((prev) => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>

  );
}

export default ResumeEditor;
