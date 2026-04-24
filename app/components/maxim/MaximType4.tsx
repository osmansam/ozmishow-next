import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType4 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  // Extract colors from background for gradient text
  const getGradientColors = () => {
    const bgColor = componentStyle?.backgroundColor;
    if (!bgColor) return "from-cyan-400 via-purple-400 to-pink-400";
    
    // If it's already a gradient, try to extract colors
    if (bgColor.includes("gradient")) {
      return "from-cyan-400 via-purple-400 to-pink-400"; // Keep default for now
    }
    
    // Create a complementary gradient based on the bg color
    return "from-cyan-400 via-purple-400 to-pink-400";
  };

  const gradientClasses = getGradientColors();
  const bgStyle = componentStyle?.backgroundColor || "#020617";

  return (
    <div
      className="w-full min-h-[600px] flex items-center justify-center py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: bgStyle, ...componentStyle }}
    >
      <div className="absolute top-4 right-4 z-30">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type4"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      {/* Parallax background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Layered cards with parallax effect */}
        <div className="relative">
          {/* Background layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl transform rotate-3 scale-95"></div>
          
          {/* Middle layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl transform -rotate-2 scale-98"></div>
          
          {/* Front layer */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
            {paragraphs?.content?.map((paragraph, index) => (
              <h2
                key={index}
                className={`text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientClasses} leading-tight mb-8 text-center`}
                style={paragraphs?.style ? paragraphs?.style : {}}
              >
                {paragraph}
              </h2>
            ))}
            <ContentModalContainer
              content={paragraphs}
              twoPictureId={_id ?? ""}
              componentId={"0"}
              contentContainerType="paragraphs"
              type="twoPictureIndex"
            />

            <div className="flex justify-center items-center gap-4 mt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
              <p
                className="text-xl font-semibold text-white flex items-center gap-2"
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
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite !important;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite !important;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite !important;
        }
      `}</style>
    </div>
  );
};

export default MaximType4;
