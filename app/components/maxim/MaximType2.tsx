import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType2 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  // Extract gradient colors from background or use default
  const getGradientColors = () => {
    const bgColor = componentStyle?.backgroundColor;
    if (bgColor && bgColor.includes("gradient")) {
      return bgColor;
    }
    return "linear-gradient(to bottom right, #4f46e5, #7c3aed, #db2777)";
  };

  const gradientBg = getGradientColors();

  return (
    <div
      className="w-full min-h-[500px] flex relative overflow-hidden"
      style={componentStyle}
    >
      <div className="absolute top-4 right-4 z-20">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type2"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      {/* Left side - Colorful gradient */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12" style={{ background: gradientBg }}>
        <div className="text-white text-9xl font-bold opacity-20">"</div>
      </div>

      {/* Right side - Content */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12">
        <div className="max-w-lg">
          {paragraphs?.content?.map((paragraph, index) => (
            <blockquote
              key={index}
              className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed mb-8 italic pl-6"
              style={{ borderLeft: `4px solid ${componentStyle?.backgroundColor || "#7c3aed"}`, ...paragraphs?.style }}
            >
              {paragraph}
            </blockquote>
          ))}
          <ContentModalContainer
            content={paragraphs}
            twoPictureId={_id ?? ""}
            componentId={"0"}
            contentContainerType="paragraphs"
            type="twoPictureIndex"
          />

          <div className="flex items-center gap-4 mt-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
              style={{ background: gradientBg }}
            >
              {header?.content?.charAt(0) || "A"}
            </div>
            <div>
              <p
                className="text-lg font-semibold text-slate-900 flex items-center gap-2"
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
              <p className="text-sm text-slate-500">Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaximType2;
