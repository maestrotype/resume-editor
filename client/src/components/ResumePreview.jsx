import React, { forwardRef } from "react";
import ClassicTemplate from "./templates/ClassicTemplate/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate/MinimalTemplate";


const ResumePreview = forwardRef(({ data, template }, ref) => {

  const renderTemplate = () => {
    switch (template) {
      case 1:
        return <ClassicTemplate ref={ref}  data={data} />;
      case 2:
        return <ModernTemplate ref={ref}  data={data} />;
      case 3:
        return <MinimalTemplate ref={ref}  data={data} />;
      default:
        return <ClassicTemplate ref={ref} data={data} />;
    }
  };

  return (
    <div className="wrapper">
      <div className="resume-preview">
        {renderTemplate()}
      </div>
    </div>
  );
});

export default ResumePreview;
