import React, { useRef, useState } from "react";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
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

  return (
    <div className="app">
      <div className="wrapper-editor">
        <ResumeEditor
          data={data}
          setData={setData}
          pdfFormat={pdfFormat}
          setPdfFormat={setPdfFormat}
        />
      </div>
      <div className="wrapper-preview">
        <ResumePreview ref={previewRef} data={data} />
      </div>
    </div>
  );
}

export default App;
