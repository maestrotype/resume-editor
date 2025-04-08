import React, { useState } from "react";
import ResumeEditor from "./components/ResumeEditor";
import ResumePreview from "./components/ResumePreview";

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

  return (
    <div className="app">
      <ResumeEditor data={data} setData={setData} />
      <ResumePreview data={data} />
    </div>
  );
}

export default App;
