const localTemplateStyles = {
    1: "/templates/ClassicTemplate.css",
    2: "/templates/ModernTemplate.css",
    3: "/templates/MinimalTemplate.css",
  };
  
  const handlePreviewPDF = (previewRef, selectedTemplate = 1) => {
    if (!previewRef.current) return;
  
    const templateStylePath = localTemplateStyles[Number(selectedTemplate)] || localTemplateStyles[1];
  
    const win = window.open("", "_blank");
    if (!win) return;
  
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="styles-pdf.css">
          <link rel="stylesheet" href="${templateStylePath}">
        </head>
        <body>
          ${previewRef.current.outerHTML}
        </body>
      </html>
    `;
  
    win.document.write(html);
    win.document.close();
  
    setTimeout(() => {
      win.document.body.style.opacity = "1";
    }, 100);
  };
  
  export default handlePreviewPDF;