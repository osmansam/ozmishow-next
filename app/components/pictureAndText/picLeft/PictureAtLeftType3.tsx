import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import { PictureWithStyleType } from "../../../shared/types";
type Props = {};

const PictureAtLeftType3 = ({
  img,
  header,
  paragraphs,
  buttons,
  componentStyle,
  componentType,
  _id,
}: PictureWithStyleType) => {
  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" style={componentStyle}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-8">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            currentType={componentType ?? ""}
            twoPictureId={_id ?? ""}
            componentTypes={pictureAndTextTypes}
            isComponentType={true}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start relative">
          {/* Content Card */}
          <div className="w-full md:w-3/5 bg-white p-8 md:p-12 rounded-3xl shadow-xl z-10 relative">
            <div className="mb-6">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
                style={header?.style}
              >
                {header?.content}
                <span className="inline-block ml-3 align-middle">
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
          </div>

          {/* Image Section (Overlapping) */}
          <div className="w-full md:w-1/2 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-8 md:mt-0 h-64 md:h-96">
            <div className="w-full h-full relative group rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={img?.content}
                alt="img"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                style={{ ...img?.style, width: "100%", height: "100%" }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              
              <div className="absolute top-4 right-4">
                <ImageStyleModalContainer
                  twoPictureId={_id ?? ""}
                  componentId={""}
                  type="twoPicture"
                  styleData={img}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureAtLeftType3;
