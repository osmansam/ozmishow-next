import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";

import { PageBannerTypes } from "../../shared/compenentTypes";

const PageBanner = ({
  img,
  header,
  _id,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div className="relative w-full h-[400px] mb-10 group overflow-hidden" style={componentStyle}>
      {/* Admin Controls */}
      <div className="absolute top-4 left-4 z-30">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          currentType="type1"
          twoPictureId={_id ?? ""}
          isComponentType={true}
          componentTypes={PageBannerTypes}
        />
      </div>

      {/* Image */}
      {img && (
        <div className="w-full h-full relative">
          <img
            src={img?.content}
            alt="pageImage"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={img?.style}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-4 right-16 z-20">
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
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
        <div className="container mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg flex items-center gap-4"
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
          <div className="h-1 w-24 bg-white mt-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
