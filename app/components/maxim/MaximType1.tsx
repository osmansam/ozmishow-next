import { useEffect, useState } from "react";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType1 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = paragraphs?.content?.[0] || "";

  // Extract accent color from background or use default
  const getAccentColor = () => {
    const bgColor = componentStyle?.backgroundColor;
    if (!bgColor) return "#10b981"; // default green
    
    // If it's a dark color, return a bright accent
    // Simple heuristic: if background is dark, use bright green
    return "#10b981"; // green for terminal theme
  };

  const accentColor = getAccentColor();

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div
      className="w-full min-h-[400px] flex items-center justify-center py-20 px-4 relative"
      style={{ backgroundColor: componentStyle?.backgroundColor || "#0f172a", ...componentStyle }}
    >
      <div className="w-full flex justify-end absolute top-4 right-4 z-10">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type1"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-2xl md:text-4xl leading-relaxed" style={{ color: accentColor }}>
          <span style={paragraphs?.style ? paragraphs?.style : {}}>
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
          </span>
        </div>
        <ContentModalContainer
          content={paragraphs}
          twoPictureId={_id ?? ""}
          componentId={"0"}
          contentContainerType="paragraphs"
          type="twoPictureIndex"
        />
        
        <div className="mt-8 flex items-center gap-3">
          <div className="w-12 h-0.5" style={{ backgroundColor: accentColor }}></div>
          <p
            className="text-lg font-mono flex items-center gap-2"
            style={{ color: accentColor, ...header?.style }}
          >
            $ {header?.content}
            <StyleModalContainer
              styleData={header}
              twoPictureId={_id ?? ""}
              componentId={"0"}
              contentContainerType="header"
              isContentSend={true}
              type="twoPictureIndex"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default MaximType1;
