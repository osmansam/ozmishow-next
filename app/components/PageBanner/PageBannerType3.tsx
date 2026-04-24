import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PageBannerTypes } from "../../shared/compenentTypes";
import { PictureWithStyleType } from "../../shared/types";

const PageBannerType3 = ({
  img,
  header,
  _id,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div className="w-full min-h-[400px] mb-10 flex flex-col md:flex-row group" style={componentStyle}>
      {/* Text Section (Left) */}
      <div className="w-full md:w-2/5 bg-gray-900 text-white p-12 flex flex-col justify-center relative order-2 md:order-1">
        <div className="absolute top-4 left-4 z-30">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            currentType="type3"
            componentTypes={PageBannerTypes}
            twoPictureId={_id ?? ""}
            isComponentType={true}
          />
        </div>
        
        <div className="relative z-10">
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight flex items-center gap-4"
            style={header?.style}
          >
            {header?.content}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          <div className="w-12 h-1 bg-blue-500 mt-6" />
        </div>
      </div>

      {/* Image Section (Right) */}
      <div className="w-full md:w-3/5 relative min-h-[300px] order-1 md:order-2 overflow-hidden">
        {img && (
          <>
            <img
              src={img?.content}
              alt="pageImage"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={img?.style}
            />
            <div className="absolute top-4 right-4 z-20">
              <ImageStyleModalContainer
                twoPictureId={_id ?? ""}
                componentId={""}
                type="twoPicture"
                styleData={img}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PageBannerType3;
