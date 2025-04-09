import React, { useRef, useState } from "react";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import html2pdf from "html2pdf.js";

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

  const handleDownloadPDF = () => {
    if (!previewRef.current) {
      console.error("Preview element not found");
      return;
    }

    html2pdf()
      .from(previewRef.current)
      .set({
        margin: 10,
        filename: "My_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="app">
      <ResumeEditor data={data} setData={setData} />
      <div>
        <ResumePreview ref={previewRef} data={data} />
        <button onClick={handleDownloadPDF} style={{ marginTop: "10px" }}>
          Export to PDF
        </button>
      </div>
    </div>
  );
}

export default App;
