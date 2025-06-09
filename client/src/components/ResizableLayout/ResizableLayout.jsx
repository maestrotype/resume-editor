import React, { useRef, useState, useEffect } from "react";
import "./resizable.css";

const ResizableLayout = ({ left, right }) => {
  const resizerRef = useRef(null);
  const leftRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !leftRef.current) return;
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < window.innerWidth * 0.7) {
        leftRef.current.style.width = `${newWidth}px`;
      }
    };

    const stopResize = () => {
      setIsResizing(false);
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing]);

  return (
    <div className="resizable-container">
      <div ref={leftRef} className="left-panel">
        {left}
      </div>
      <div
        ref={resizerRef}
        className="resizer"
        onMouseDown={() => {
          setIsResizing(true);
          document.body.style.cursor = "col-resize";
        }}
      />
      <div className="right-panel">{right}</div>
    </div>
  );
};

export default ResizableLayout;
