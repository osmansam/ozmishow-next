import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType3 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  // Extract accent color from background
  const getAccentColor = () => {
    const bgColor = componentStyle?.backgroundColor;
    if (!bgColor) return "#f97316"; // default orange
    
    // If gradient, extract first color
    if (bgColor.includes("gradient")) {
      const match = bgColor.match(/#[0-9a-fA-F]{6}/);
      return match ? match[0] : "#f97316";
    }
    return bgColor;
  };

  const accentColor = getAccentColor();
  const lightBg = componentStyle?.backgroundColor || "linear-gradient(to bottom right, #fef3c7, #fed7aa)";

  return (
    <div
      className="w-full min-h-[400px] flex items-center justify-center py-20 px-4 relative"
      style={{ background: lightBg, ...componentStyle }}
    >
      <div className="absolute top-4 right-4">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type3"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Animated quote marks */}
        <div 
          className="absolute -top-8 -left-8 text-8xl font-serif animate-bounce opacity-30"
          style={{ color: accentColor }}
        >
          "
        </div>
        <div 
          className="absolute -bottom-8 -right-8 text-8xl font-serif animate-bounce opacity-30" 
          style={{ color: accentColor, animationDelay: '0.5s' }}
        >
          "
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-12 transform hover:scale-105 transition-transform duration-300">
          {paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className="text-2xl md:text-3xl font-light text-slate-700 leading-relaxed text-center animate-fade-in"
              style={{
                ...paragraphs?.style,
                animation: 'fadeIn 1s ease-in'
              }}
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

          <div className="mt-8 flex justify-center">
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-lg"
              style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}dd)` }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <p
                className="text-white font-semibold flex items-center gap-2"
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
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in !important;
        }
      `}</style>
    </div>
  );
};

export default MaximType3;
