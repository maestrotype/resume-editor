import React, { useRef, useState } from "react";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import html2pdf from "html2pdf.js";
import './i18n';

function App() {
  const [data, setData] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    contacts: ""
  });

  const previewRef = useRef();

  const [pdfFormat, setPdfFormat] = useState("a4");

  const handleDownloadPDF = () => {
    if (!previewRef.current) {
      console.error("Preview element not found");
      return;
    }

    const element = previewRef.current.cloneNode(true);

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/styles-pdf.css";
    element.insertBefore(styleLink, element.firstChild);

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "My_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: pdfFormat, orientation: "portrait" },
      })
      .save();
  };

  const handlePreviewPDF = () => {
    if (!previewRef.current) return;

    const win = window.open("", "_blank");
    const html = `
      <html>
        <head>
          <link rel="stylesheet" href="/styles-pdf.css" />
        </head>
        <body>
          ${previewRef.current.outerHTML}
        </body>
      </html>
    `;
    win.document.write(html);
    win.document.close();
  };

  return (
    <div className="app">
      <div className="wrapper-editor">
        <ResumeEditor
          data={data}
          setData={setData}
          pdfFormat={pdfFormat}
          setPdfFormat={setPdfFormat}
        />
        <div className="button-group">
          <button className="button-primary" onClick={handlePreviewPDF}>
            Preview PDF
          </button>
          <button className="button-primary" onClick={handleDownloadPDF}>
            Export to PDF
          </button>
        </div>
      </div>
      <div className="wrapper-preview">
        <ResumePreview ref={previewRef} data={data} />
      </div>
    </div>
  );
}

export default App;
