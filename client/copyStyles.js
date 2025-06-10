// copyStyles.js
const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'components', 'templates');
const targetDir = path.join(__dirname, 'public', 'templates');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

const templates = ['ClassicTemplate', 'ModernTemplate', 'MinimalTemplate'];

templates.forEach(template => {
  const sourceFile = path.join(sourceDir, template, `${template}.css`);
  const targetFile = path.join(targetDir, `${template}.css`);

  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Скопирован: ${template}.css в public/templates/`);
  } else {
    console.log(`Файл не найден: ${template}.css`);
  }
});

console.log('Копирование стилей завершено!');