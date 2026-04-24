import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import { PictureWithStyleType } from "../../../shared/types";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";
const PictureAtLeft = ({
  img,
  header,
  paragraphs,
  buttons,
  componentStyle,
  componentType,
  _id,
}: PictureWithStyleType) => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white" style={componentStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            currentType={componentType ?? ""}
            twoPictureId={_id ?? ""}
            componentTypes={pictureAndTextTypes}
            isComponentType={true}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={img?.content}
                alt={header?.content}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                style={{ ...img?.style, width: "100%", height: "100%" }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="absolute top-4 right-4">
              <ImageStyleModalContainer
                twoPictureId={_id ?? ""}
                componentId={""}
                type="twoPicture"
                styleData={img}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="relative">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight"
                style={header?.style}
              >
                {header?.content}
                <span className="inline-block ml-2 align-middle">
                  <StyleModalContainer
                    styleData={header}
                    twoPictureId={_id ?? ""}
                    componentId={""}
                    contentContainerType="header"
                    isContentSend={true}
                    type="twoPicture"
                  />
                </span>
              </h2>
            </div>

            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              {paragraphs?.content?.map((paragraph, index) => (
                <p key={index} style={paragraphs?.style}>
                  {paragraph}
                </p>
              ))}
              <div className="mt-2">
                <ContentModalContainer
                  content={paragraphs}
                  twoPictureId={_id ?? ""}
                  componentId={""}
                  contentContainerType="paragraphs"
                  type="twoPicture"
                />
              </div>
            </div>

            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {buttons.map((button, index) => (
                  <div key={index} className="relative group" style={button.style}>
                    <ButtonUnderline
                      text={button.content}
                      buttonLink={button.link}
                    />
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <StyleModalContainer
                        styleData={button}
                        twoPictureId={_id ?? ""}
                        componentId={""}
                        contentContainerType="buttons"
                        isContentSend={true}
                        type="twoPicture"
                        buttonIndex={index}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureAtLeft;
