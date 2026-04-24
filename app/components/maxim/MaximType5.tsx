import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType5 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  // Extract accent color from background
  const getAccentColor = () => {
    const bgColor = componentStyle?.backgroundColor;
    if (!bgColor) return "#10b981"; // default emerald
    
    // If gradient, extract first color
    if (bgColor.includes("gradient")) {
      const match = bgColor.match(/#[0-9a-fA-F]{6}/);
      return match ? match[0] : "#10b981";
    }
    return bgColor;
  };

  // Helper to convert hex to HSL
  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 50, l: 50 };
    
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

  // Helper to convert HSL to hex
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

  const accentColor = getAccentColor();
  
  // Create a lighter/brighter version for particles so they're always visible
  const getParticleColor = () => {
    const hsl = hexToHSL(accentColor);
    // Make it much lighter and more saturated
    return hslToHex(hsl.h, Math.min(hsl.s + 20, 100), Math.min(hsl.l + 40, 95));
  };

  const particleColor = getParticleColor();
  const bgStyle = componentStyle?.backgroundColor || "linear-gradient(to bottom right, #064e3b, #134e4a, #155e75)";

  return (
    <div
      className="w-full min-h-[500px] flex items-center justify-center py-20 px-4 relative overflow-hidden"
      style={{ background: bgStyle, ...componentStyle }}
    >
      <div className="absolute top-4 right-4 z-30">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type5"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-64 wave-animation-1" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, opacity: 0.3 }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 wave-animation-2" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, opacity: 0.2 }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 wave-animation-3" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, opacity: 0.15 }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="particle particle-1" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-2" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-3" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-4" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-5" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-6" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-7" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
        <div className="particle particle-8" style={{ background: particleColor, boxShadow: `0 0 10px ${particleColor}` }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl hover-lift" style={{ borderColor: `${accentColor}4d`, borderWidth: '1px', borderStyle: 'solid' }}>
          {/* Animated corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 rounded-tl-3xl animate-corner-pulse" style={{ borderTop: `4px solid ${accentColor}`, borderLeft: `4px solid ${accentColor}` }}></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 rounded-br-3xl animate-corner-pulse-delayed" style={{ borderBottom: `4px solid ${accentColor}`, borderRight: `4px solid ${accentColor}` }}></div>

          <div className="relative">
            {/* Glowing quotation icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-xl opacity-50 animate-pulse-soft" style={{ background: accentColor }}></div>
                <svg className="relative w-16 h-16" fill={accentColor} viewBox="0 0 24 24" style={{ opacity: 0.8 }}>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>

            {paragraphs?.content?.map((paragraph, index) => (
              <p
                key={index}
                className="text-2xl md:text-4xl font-semibold text-white leading-relaxed text-center mb-8"
                style={{ textShadow: `0 0 20px ${accentColor}4d`, ...paragraphs?.style }}
              >
                {paragraph}
              </p>
            ))}
            <ContentModalContainer
              content={paragraphs}
              twoPictureId={_id ?? ""}
              componentId={"0"}
              contentContainerType="paragraphs"
              type="twoPictureIndex"
            />

            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="h-px w-16 animate-shimmer" style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}></div>
              <div className="px-6 py-3 rounded-full shadow-lg glow-badge" style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}cc)` }}>
                <p
                  className="text-lg font-bold text-white flex items-center gap-2"
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
              </div>
              <div className="h-px w-16 animate-shimmer-delayed" style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        .wave-animation-1 { animation: wave 8s ease-in-out infinite !important; }
        .wave-animation-2 { animation: wave 10s ease-in-out infinite !important; animation-delay: 2s !important; }
        .wave-animation-3 { animation: wave 12s ease-in-out infinite !important; animation-delay: 4s !important; }

        .particle {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: float-up 12s ease-in infinite !important;
          opacity: 0.8;
        }
        .particle-1 { left: 10%; animation-delay: 0s !important; }
        .particle-2 { left: 20%; animation-delay: 2s !important; }
        .particle-3 { left: 35%; animation-delay: 4s !important; }
        .particle-4 { left: 50%; animation-delay: 1s !important; }
        .particle-5 { left: 65%; animation-delay: 5s !important; }
        .particle-6 { left: 75%; animation-delay: 3s !important; }
        .particle-7 { left: 85%; animation-delay: 6s !important; }
        .particle-8 { left: 92%; animation-delay: 7s !important; }

        @keyframes float-up {
          0% { bottom: -20px; opacity: 0; transform: scale(0.5); }
          10% { opacity: 0.8; transform: scale(1); }
          90% { opacity: 0.8; transform: scale(1); }
          100% { bottom: 100%; opacity: 0; transform: scale(0.5); }
        }

        @keyframes corner-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-corner-pulse { animation: corner-pulse 3s ease-in-out infinite !important; }
        .animate-corner-pulse-delayed { animation: corner-pulse 3s ease-in-out infinite !important; animation-delay: 1.5s !important; }

        @keyframes pulse-soft {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite !important; }

        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite !important; }
        .animate-shimmer-delayed { animation: shimmer 2s ease-in-out infinite !important; animation-delay: 1s !important; }

        .hover-lift {
          transition: transform 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-10px) !important;
        }

        .glow-badge {
          animation: badge-glow 2s ease-in-out infinite !important;
        }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default MaximType5;
