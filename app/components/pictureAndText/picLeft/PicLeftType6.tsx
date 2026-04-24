import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { pictureAndTextTypes } from "../../../shared/compenentTypes";
import { PictureWithStyleType } from "../../../shared/types";
const PicLeftType6 = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  componentType,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white"
      style={componentStyle}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            currentType={componentType ?? ""}
            twoPictureId={_id ?? ""}
            componentTypes={pictureAndTextTypes}
            isComponentType={true}
          />
        </div>
        
        <div className="flex flex-col items-center text-center gap-10">
          {/* Header */}
          <div className="relative">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight uppercase"
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
            </h1>
            <div className="w-24 h-1 bg-gray-900 mx-auto mt-6 rounded-full" />
          </div>

          {/* Paragraph */}
          <div className="w-full max-w-2xl">
            {paragraphs && (
              <p
                className="text-lg md:text-xl text-gray-600 leading-relaxed"
                style={paragraphs?.style}
              >
                {paragraphs?.content?.[0]?.length &&
                paragraphs?.content?.[0]?.length > 250 ? (
                  <>{paragraphs?.content?.[0]?.substring(0, 250)}...</>
                ) : (
                  <>{paragraphs?.content?.[0]}</>
                )}
              </p>
            )}
            <div className="mt-4 flex justify-center">
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
      </div>
    </div>
  );
};

export default PicLeftType6;
