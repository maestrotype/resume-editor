import React from 'react';

const templates = [
  { id: 1, name: 'Classic', description: 'A clean and professional resume template.', className: 'classic-template' },
  { id: 2, name: 'Modern', description: 'A stylish and creative resume template.', className: 'modern-template' },
  { id: 3, name: 'Minimal', description: 'A simple and elegant resume template.', className: 'minimal-template' },
];

const TemplateCard = ({ template, onClick }) => {
  return (
    <div className="template-card" onClick={() => onClick(template.id)}>
      <h3 className="template-name">{template.name}</h3>
      <p className="template-description">{template.description}</p>
      <button className="btn-preview">Preview</button>
    </div>
  );
};

function Templates({ onTemplateSelect }) {

  const handleSelect = (id) => {
    onTemplateSelect(id);
  };

  return (
    <div className="templates-page">
      <h2 className="page-title">Available Resume Templates</h2>
      <div className="templates-list">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} onClick={handleSelect} />
        ))}
      </div>
    </div>
  );
}

export default Templates;
