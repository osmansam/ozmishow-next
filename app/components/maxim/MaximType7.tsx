import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

const MaximType7 = ({
  header,
  paragraphs,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  // Extract accent color from background
  const getAccentColor = () => {
    const bgColor = componentStyle?.backgroundColor;
    if (!bgColor) return "#a855f7"; // default purple
    
    // If gradient, extract a color
    if (bgColor.includes("gradient")) {
      const match = bgColor.match(/#[0-9a-fA-F]{6}/);
      return match ? match[0] : "#a855f7";
    }
    return bgColor;
  };

  const accentColor = getAccentColor();
  const bgStyle = componentStyle?.backgroundColor || "linear-gradient(to bottom right, #f0fdfa, #dbeafe, #fae8ff)";

  return (
    <div
      className="w-full min-h-[450px] flex items-center justify-center py-20 px-4 relative"
      style={{ background: bgStyle, ...componentStyle }}
    >
      <div className="absolute top-4 right-4 z-20">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType="type7"
          twoPictureId={_id ?? ""}
          componentTypes={["type1", "type2", "type3", "type4", "type5", "type6", "type7"]}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Decorative illustrations */}
        <div className="absolute -top-12 -left-12 w-32 h-32 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={accentColor} d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.8C64.8,56.4,53.8,69,40.1,76.8C26.4,84.6,10,87.6,-5.7,86.3C-21.4,85,-42.8,79.4,-58.2,69.1C-73.6,58.8,-83,43.8,-87.8,27.4C-92.6,11,-92.8,-6.8,-88.2,-23.4C-83.6,-40,-74.2,-55.4,-61.3,-63.2C-48.4,-71,-32,-71.2,-16.8,-73.8C-1.6,-76.4,12.4,-81.4,26.4,-82.2C40.4,-83,54.4,-79.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute -bottom-12 -right-12 w-40 h-40 opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={accentColor} d="M39.5,-65.5C51.4,-58.7,61.3,-48.3,68.5,-36.2C75.7,-24.1,80.2,-10.3,80.8,3.9C81.4,18.1,78.1,32.7,70.3,45.2C62.5,57.7,50.2,68.1,36.3,74.8C22.4,81.5,6.9,84.5,-8.3,83.2C-23.5,81.9,-38.4,76.3,-51.8,68.1C-65.2,59.9,-77.1,49.1,-82.6,35.8C-88.1,22.5,-87.2,6.7,-83.5,-7.9C-79.8,-22.5,-73.3,-35.9,-63.8,-46.8C-54.3,-57.7,-41.8,-66.1,-28.5,-72.3C-15.2,-78.5,-1.1,-82.5,11.6,-79.8C24.3,-77.1,27.6,-72.3,39.5,-65.5Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-xl relative z-10" style={{ borderColor: `${accentColor}33`, borderWidth: '2px', borderStyle: 'solid' }}>
          {/* Decorative stars */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-6 h-6" fill={accentColor} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className="text-2xl md:text-3xl font-semibold text-slate-800 leading-relaxed text-center mb-8 px-4"
              style={paragraphs?.style ? paragraphs?.style : {}}
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
            <div className="w-16 h-1 rounded-full" style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}66)` }}></div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: `linear-gradient(to right, ${accentColor}1a, ${accentColor}33)` }}>
              <svg className="w-5 h-5" fill={accentColor} viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <p
                className="text-base font-bold flex items-center gap-2"
                style={{ color: accentColor, ...header?.style }}
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
            <div className="w-16 h-1 rounded-full" style={{ background: `linear-gradient(to right, ${accentColor}66, ${accentColor})` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaximType7;
