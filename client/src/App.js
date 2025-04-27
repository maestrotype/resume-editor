// src/App.js
import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import ResumeList from "./components/ResumeList";
import Templates from "./components/Templates";
import ResumeDetail from "./components/ResumeDetail";

function App() {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    contacts: "",
  });

  const previewRef = useRef();
  const [pdfFormat, setPdfFormat] = useState("a4");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "light");
  };

  const handlePreviewPDF = () => {
    console.log("Export PDF clicked");
    // Implement PDF export logic
  };

  const handleExportPDF = () => {
    console.log("Export PDF clicked");
    // Implement PDF export logic
  };

  const handleSave = () => {
    console.log("Save to database clicked");
    // Implement save logic
  };

  return (
    <main className={theme === "dark" ? "dark bg-gray-800 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <Router>
        <Header
          toggleTheme={toggleTheme}
          currentTheme={theme}
          handlePreviewPDF={handlePreviewPDF}
          handleExportPDF={handleExportPDF}
          handleSave={handleSave}
        />
        <div className="app p-4">
          <div className="wrapper-editor">
            <main className="p-4">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ResumeEditor
                      data={data}
                      setData={setData}
                      pdfFormat={pdfFormat}
                      setPdfFormat={setPdfFormat}
                      previewRef={previewRef}
                    />
                  }
                />
                <Route path="/resumes" element={<ResumeList />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/resumes/:id" element={<ResumeDetail />} />
              </Routes>
            </main>
          </div>
          <div className="wrapper-preview">
            <ResumePreview ref={previewRef} data={data} />
          </div>
        </div>
      </Router>
    </main>
  );
}

export default App;
