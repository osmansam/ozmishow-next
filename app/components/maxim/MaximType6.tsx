import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType6 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  // Helper function to convert hex to HSL
  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Helper function to convert HSL to hex
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  };

  // Extract gradient colors and create contrasting border colors
  const getGradientColors = () => {
    const bgColor = componentStyle?.backgroundColor;
    
    // Default vibrant colors
    const defaultColors = { 
      border1: "#db2777", 
      border2: "#7c3aed", 
      border3: "#2563eb" 
    };
    
    if (!bgColor) return defaultColors;
    
    let extractedColors: string[] = [];
    
    // If gradient, extract colors
    if (bgColor.includes("gradient")) {
      const colors = bgColor.match(/#[0-9a-fA-F]{6}/g);
      if (colors && colors.length > 0) {
        extractedColors = colors;
      }
    } else if (bgColor.startsWith("#")) {
      extractedColors = [bgColor];
    }
    
    // If we have extracted colors, create analogous border colors in the same family
    if (extractedColors.length > 0) {
      const baseColor = extractedColors[0];
      const hsl = hexToHSL(baseColor);
      
      // Create analogous colors (same color family) for the border
      // Use small hue shifts (±30-60 degrees) to stay in the same color family
      // Increase lightness for lighter/brighter variations
      const border1 = hslToHex(
        (hsl.h - 30 + 360) % 360, // Slightly shift hue left
        Math.min(hsl.s + 15, 100), // Slightly more saturated
        Math.min(hsl.l + 25, 85)   // Lighter
      );
      const border2 = hslToHex(
        hsl.h, // Keep same hue
        Math.min(hsl.s + 25, 100), // More saturated
        Math.min(hsl.l + 35, 90)   // Much lighter
      );
      const border3 = hslToHex(
        (hsl.h + 30) % 360, // Slightly shift hue right
        Math.min(hsl.s + 20, 100), // More saturated
        Math.min(hsl.l + 30, 88)   // Lighter
      );
      
      return { border1, border2, border3 };
    }
    
    return defaultColors;
  };

  const { border1, border2, border3 } = getGradientColors();
  const bgStyle = componentStyle?.backgroundColor || "#000000";

  return (
    <div
      className="w-full min-h-[450px] flex items-center justify-center py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: bgStyle, ...componentStyle }}
    >
      <div className="absolute top-4 right-4 z-20">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type6"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      {/* Animated gradient border container */}
      <div className="max-w-4xl mx-auto relative">
        <div 
          className="absolute -inset-1 rounded-3xl blur opacity-75 animate-gradient-rotate"
          style={{ background: `linear-gradient(to right, ${border1}, ${border2}, ${border3})` }}
        ></div>
        
        <div className="relative bg-black rounded-3xl p-12 border-2 border-transparent">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-0 animate-gradient-shift opacity-20"
              style={{ background: `linear-gradient(to right, ${border1}, ${border2}, ${border3})` }}
            ></div>
          </div>

          <div className="relative z-10">
            {/* Pulsing glow effect */}
            <div 
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full blur-3xl animate-pulse-slow"
              style={{ background: `${border2}4d` }}
            ></div>

            {paragraphs?.content?.map((paragraph, index) => (
              <h1
                key={index}
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight text-center mb-8 drop-shadow-2xl"
                style={paragraphs?.style ? paragraphs?.style : {}}
              >
                {paragraph}
              </h1>
            ))}
            <ContentModalContainer
              content={paragraphs}
              twoPictureId={_id ?? ""}
              componentId={"0"}
              contentContainerType="paragraphs"
              type="twoPictureIndex"
            />

            <div className="flex justify-center items-center gap-4 mt-8">
              <div 
                className="flex items-center gap-3 px-8 py-4 rounded-full shadow-lg animate-pulse-glow"
                style={{ background: `linear-gradient(to right, ${border1}, ${border2})` }}
              >
                <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
                <p
                  className="text-xl font-bold text-white flex items-center gap-2"
                  style={header?.style ? header?.style : {}}
                >
                  {header?.content}
                  <StyleModalContainer
                    styleData={header}
                    twoPictureId={_id ?? ""}
                    componentId={"0"}
                    contentContainerType="header"
                    isContentSend={true}
                    type="twoPictureIndex"
                  />
                </p>
                <div className="w-3 h-3 rounded-full bg-white animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px ${border1}80; }
          50% { box-shadow: 0 0 40px ${border2}cc; }
        }
        .animate-gradient-rotate {
          animation: gradient-rotate 3s linear infinite !important;
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite !important;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite !important;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite !important;
        }
      `}</style>
    </div>
  );
};

export default MaximType6;
