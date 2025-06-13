import html2pdf from "html2pdf.js";

const templateStyles = {
  1: "/templates/ClassicTemplate.css",
  2: "/templates/ModernTemplate.css",
  3: "/templates/MinimalTemplate.css",
};

const handleExportPDF = (previewRef, selectedTemplate = 1) => {
  if (!previewRef.current) {
    console.error("Preview element not found");
    return;
  }

  const templateStyle = templateStyles[selectedTemplate] || templateStyles[1];

  const element = previewRef.current.cloneNode(true);
  const container = document.createElement("div");

  container.style.position = "absolute";
  container.style.top = "-9999px";
  container.style.left = "-9999px";
  container.style.width = "794px";
  container.appendChild(element);
  document.body.appendChild(container);

  const styleLink = document.createElement("link");
  const styleLinkMain = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = templateStyle;
  styleLinkMain.rel = "stylesheet";
  styleLinkMain.href = "/styles.css";

  element.insertBefore(styleLink, element.firstChild);
  element.insertBefore(styleLinkMain, element.firstChild);

  const width = element.scrollWidth;
  const height = element.scrollHeight;

  html2pdf()
    .from(element)
    .set({
      margin: 10,
      filename: "My_Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: [width, height], orientation: "portrait" },
    })
    .save()
    .then(() => {
      document.body.removeChild(container);
    });
};

export default handleExportPDF;
