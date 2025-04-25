import React from "react";
import { FaPhoneAlt, FaTelegramPlane, FaEnvelope, FaLinkedin } from "react-icons/fa";

const ContactBlock = ({ contacts }) => {
  
  const lines = contacts.split("\n").filter(Boolean);

  const renderIcon = (line) => {
    if (line.includes("@") && !line.includes("telegram")) return <FaEnvelope />;
    if (line.toLowerCase().includes("telegram")) return <FaTelegramPlane />;
    if (line.includes("linkedin") || line.includes("linkedin.com")) return <FaLinkedin />;
    if (line.match(/\+?\d+/)) return <FaPhoneAlt />;
    return null;
  };

  return (
    <div className="contact-block">
      {lines.map((line, i) => (
        <div className="contact-line" key={i}>
          <span className="icon">{renderIcon(line)}</span>
          <span className="text">{line}</span>
        </div>
      ))}
    </div>
  );
};

export default ContactBlock;
