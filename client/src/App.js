// src/App.js
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import AuthRoutes from "./modules/auth/routes";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";
import ResumeList from "./components/ResumeList";
import Templates from "./components/Templates";
import ResumeDetail from "./components/ResumeDetail";
import handleExportToPptx from "./utils/export/handleExportToPptx";
import handlePreviewPDF from "./utils/export/handlePreviewPDF";
import handleExportPDF from "./utils/export/handleExportPDF";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import 'antd/dist/reset.css';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import ResizableLayout from "./components/ResizableLayout/ResizableLayout.jsx";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [theme, setTheme] = useState("light");
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [pdfFormat, setPdfFormat] = useState("a4");
  const [data, setData] = useState({
    name: "",
    title: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    contacts: "",
  });

  useEffect(() => {
    if (location.state?.resume) {
      setData(location.state.resume);
    }
  }, [location.state]);

  const previewRef = useRef();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTemplateSelect = (id) => {
    setSelectedTemplate(id);
  };

  const handleSave = async () => {
    try {
      const isNew = location.pathname === '/editor/new';
      const isUpdate = !!data._id && !isNew;

      const { _id, ...cleanData } = data;
      const payload = isUpdate ? data : { ...cleanData, avatar: data.avatar };

      const url = isUpdate
        ? `${API_URL}/resumes/${data._id}`
        : `${API_URL}/resumes`;

      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save resume");
      }

      const result = await response.json();
      console.log("Resume saved:", result);

      if (isNew && result._id) {
        // update ID, and redirect
        setData((prev) => ({ ...prev, _id: result._id }));
        window.history.replaceState({}, '', `/editor/${result._id}`);
      }

      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save resume. Please try again.");
    }
  };

  return (
    <main className={theme === "dark" ? "dark bg-gray-800 min-h-screen" : "bg-gray-100 min-h-screen"}>
      <AuthProvider>
        <Header
          toggleTheme={toggleTheme}
          currentTheme={theme}
          handlePreviewPDF={() => handlePreviewPDF(previewRef, selectedTemplate)}
          handleExportPDF={() => handleExportPDF(previewRef, selectedTemplate)}
          handleExportToPptx={() => handleExportToPptx(data)}
          handleSave={handleSave}
        />
        <div className="app p-4">
          {isMobile ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              autoHeight={true}
              navigation
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <ResumeEditor
                  data={data}
                  setData={setData}
                  pdfFormat={pdfFormat}
                  setPdfFormat={setPdfFormat}
                  template={selectedTemplate}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ResumePreview ref={previewRef} data={data} />
              </SwiperSlide>
            </Swiper>
          ) : (
            <ResizableLayout
              left={
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ResumeEditor
                        data={data}
                        setData={setData}
                        pdfFormat={pdfFormat}
                        setPdfFormat={setPdfFormat}
                        template={selectedTemplate}
                      />
                    }
                  />
                  {AuthRoutes()}
                  <Route path="/resumes" element={<ResumeList />} />
                  <Route path="/templates" element={<Templates onTemplateSelect={handleTemplateSelect} />} />
                  <Route path="/resumes/:id" element={<ResumeDetail />} />
                  <Route
                    path="/editor/:id"
                    element={
                      <ResumeEditor
                        data={data}
                        setData={setData}
                        pdfFormat={pdfFormat}
                        setPdfFormat={setPdfFormat}
                        template={selectedTemplate}
                      />
                    }
                  />
                  <Route
                    path="/editor/new"
                    element={
                      <ResumeEditor
                        data={data}
                        setData={setData}
                        pdfFormat={pdfFormat}
                        setPdfFormat={setPdfFormat}
                        template={selectedTemplate}
                      />
                    }
                  />
                </Routes>
              }
              right={
                <ResumePreview ref={previewRef} data={data} template={selectedTemplate} />
              }
            />
          )}
        </div>
      </AuthProvider>
    </main>
  );
}

export default App;
