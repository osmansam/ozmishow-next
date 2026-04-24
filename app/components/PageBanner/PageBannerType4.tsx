import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PageBannerTypes } from "../../shared/compenentTypes";
import { PictureWithStyleType } from "../../shared/types";

const PageBannerType4 = ({
  img,
  header,
  _id,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div className="w-full px-4 md:px-8 py-8 mb-4" style={componentStyle}>
      <div className="relative w-full h-[350px] rounded-[2rem] overflow-hidden shadow-2xl group">
        {/* Admin Controls */}
        <div className="absolute top-6 left-6 z-30 bg-white/20 backdrop-blur-md rounded-full p-1">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            currentType="type4"
            componentTypes={PageBannerTypes}
            twoPictureId={_id ?? ""}
            isComponentType={true}
          />
        </div>

        {/* Image */}
        {img && (
          <div className="absolute inset-0 w-full h-full">
            <img
              src={img?.content}
              alt="pageImage"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={img?.style}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute top-6 right-20 z-20">
              <ImageStyleModalContainer
                twoPictureId={_id ?? ""}
                componentId={""}
                type="twoPicture"
                styleData={img}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex items-center p-8 md:p-16">
          <div className="max-w-2xl">
            <h2
              className="text-4xl md:text-6xl font-bold text-white leading-tight flex flex-col gap-4"
              style={header?.style}
            >
              {header?.content}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
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
        </div>
      </div>
    </div>
  );
};

export default PageBannerType4;
