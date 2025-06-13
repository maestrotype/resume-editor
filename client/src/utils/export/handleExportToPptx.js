import PptxGenJS from "pptxgenjs";

const handleExportToPptx = (data) => {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "A4", width: 8.27, height: 11.69 });
  pptx.layout = "A4";

  const slide = pptx.addSlide();
  slide.background = { fill: "F7F7F7" };

  const sectionTitleStyle = {
    fontSize: 14,
    bold: true,
    color: "1F2937",
  };

  const textStyle = {
    fontSize: 12,
    color: "1F2937",
    lineSpacing: 20,
    wrap: true,
  };

  let cursorY = 0.3;

  // Header
  slide.addText(data.name || "Your Name", {
    x: 0.5, y: cursorY, w: 7.5, h: 0.5,
    fontSize: 24, bold: true, color: "222222",
  });
  cursorY += 0.6;

  slide.addText(data.title || "Job Title", {
    x: 0.5, y: cursorY, w: 7.5, h: 0.3,
    fontSize: 14, italic: true, color: "444444",
  });
  cursorY += 0.5;

  // Summary
  slide.addText("Summary", { ...sectionTitleStyle, x: 0.5, y: cursorY });
  cursorY += 0.3;

  slide.addText(data.summary || "-", {
    x: 0.5, y: cursorY, w: 7.2, h: 1.2,
    ...textStyle,
  });
  cursorY += 1.3;

  // Experience
  slide.addText("Experience", { ...sectionTitleStyle, x: 0.5, y: cursorY });
  cursorY += 0.3;

  slide.addText(data.experience || "-", {
    x: 0.5, y: cursorY, w: 7.2, h: 2.5,
    ...textStyle,
  });
  cursorY += 2.6;

  // Skills
  slide.addText("Skills", { ...sectionTitleStyle, x: 0.5, y: cursorY });
  cursorY += 0.3;

  const skillList = (data.skills || "-")
    .split("\n")
    .filter(Boolean)
    .map((s) => ({ text: s, options: { bullet: true } }));

  slide.addText(skillList, {
    x: 0.5, y: cursorY, w: 3.4, h: 2,
    fontSize: 12,
    color: "1F2937",
  });

  // Contacts
  slide.addText("Contacts", { ...sectionTitleStyle, x: 4.2, y: cursorY });
  slide.addText(data.contacts || "-", {
    x: 4.2, y: cursorY + 0.3, w: 3.4, h: 2,
    ...textStyle,
  });

  pptx.writeFile("Modern_Styled_Resume.pptx");
};

export default handleExportToPptx;
