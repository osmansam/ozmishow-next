import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PageBannerTypes } from "../../shared/compenentTypes";
import { PictureWithStyleType } from "../../shared/types";

const PageBannerType2 = ({
  img,
  header,
  _id,
  componentStyle,
}: PictureWithStyleType) => {
  return (
    <div className="relative w-full h-[500px] mb-10 group overflow-hidden flex items-center justify-center" style={componentStyle}>
      {/* Admin Controls */}
      <div className="absolute top-4 left-4 z-30">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          currentType="type2"
          componentTypes={PageBannerTypes}
          twoPictureId={_id ?? ""}
          isComponentType={true}
        />
      </div>

      {/* Image Background */}
      {img && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={img?.content}
            alt="pageImage"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={img?.style}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          
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

      {/* Centered Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2
          className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight drop-shadow-2xl flex flex-col items-center gap-4"
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
        <div className="w-24 h-1.5 bg-white mx-auto mt-6 rounded-full" />
      </div>
    </div>
  );
};

export default PageBannerType2;
