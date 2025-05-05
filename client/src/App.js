// src/App.js
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import html2pdf from "html2pdf.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import ResumeList from "./components/ResumeList";
import Templates from "./components/Templates";
import ResumeDetail from "./components/ResumeDetail";
import MobileTabs from "./components/MobileTabs";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("editor");
  const isMobile = window.innerWidth <= 768;
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
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
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

  const handleExportPDF = () => {
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

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ошибка сохранения резюме");
      }

      const result = await response.json();
      console.log("Resume save is success:", result);
      alert(t("resumeSaveSuccess"));
    } catch (error) {
      console.error("❌ Error save:", error);
      alert(t("resumeSaveError"));
    }
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
                    <>
                      {isMobile ? (
                        <>
                          {activeTab === "editor" && (
                            <ResumeEditor
                              data={data}
                              setData={setData}
                              pdfFormat={pdfFormat}
                              setPdfFormat={setPdfFormat}
                              previewRef={previewRef}
                            />
                          )}
                          {activeTab === "preview" && (
                            <ResumePreview ref={previewRef} data={data} />
                          )}
                          <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        </>
                      ) : (
                        <ResumeEditor
                          data={data}
                          setData={setData}
                          pdfFormat={pdfFormat}
                          setPdfFormat={setPdfFormat}
                          previewRef={previewRef}
                        />
                      )}
                    </>
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
