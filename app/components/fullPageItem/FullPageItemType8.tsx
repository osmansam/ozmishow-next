import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  getPageTwoPictures,
  resetTwoPictureArray,
  updateContainer,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import { FullPageItemType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";

const FullPageItemType8 = ({
  mainMainHeader,
  fullPageItemArray,
  componentStyle,
  id,
  page,
}: FullPageItemType) => {
  const dispatch = useAppDispatch();
  const [isAddNewItem, setIsAddNewItem] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCreate = async () => {
    await dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, [fullPageItemArray]);

  return (
    <div className="w-full relative bg-black" style={componentStyle}>
      <div className="absolute top-4 right-4 z-50">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type8"
          isComponentType={true}
          componentTypes={[
            "type1",
            "type2",
            "type3",
            "type4",
            "type5",
            "type6",
            "type7",
            "type8",
          ]}
        />
      </div>

      {fullPageItemArray.map((fullPageItem, index) => {
        const { header, paragraphs, img } = fullPageItem;
        // Check if content looks like a video url
        const isVideo = img?.content?.match(/\.(mp4|webm|ogg)$/i);

        return (
          <div
            key={index}
            className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
          >
            {/* Background Media */}
            <div className="absolute inset-0 w-full h-full">
              {img?.content && (
                <>
                  {isVideo ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={img?.content} // Fallback if video fails
                      style={img?.style}
                    >
                      <source src={img?.content} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={img?.content}
                      alt={header?.content}
                      className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
                      style={img?.style}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

                  <div className="absolute top-4 right-4 z-20">
                    <ImageStyleModalContainer
                      twoPictureId={id ?? ""}
                      componentId={index.toString()}
                      type="twoPictureIndex"
                      styleData={img}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-20">
              <div className="lg:col-span-8">
                {index === 0 && mainMainHeader?.content && (
                  <div className="mb-6 inline-block">
                    <span
                      className="text-sm font-bold tracking-[0.2em] uppercase text-blue-400 border border-blue-400 px-4 py-1 rounded-full"
                      style={mainMainHeader?.style}
                    >
                      {mainMainHeader?.content}
                      <StyleModalContainer
                        styleData={mainMainHeader}
                        twoPictureId={id ?? ""}
                        componentId={""}
                        contentContainerType="mainHeader"
                        isContentSend={true}
                        type="mainMainHeader"
                      />
                    </span>
                  </div>
                )}

                <h2
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter"
                  style={header?.style}
                >
                  {header?.content}
                  <StyleModalContainer
                    styleData={header}
                    twoPictureId={id ?? ""}
                    componentId={index.toString()}
                    contentContainerType="header"
                    isContentSend={true}
                    type="twoPictureIndex"
                  />
                </h2>

                <div
                  className="text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-blue-500 pl-6"
                  style={paragraphs?.style}
                >
                  {paragraphs?.content?.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                  <ContentModalContainer
                    content={paragraphs}
                    twoPictureId={id ?? ""}
                    componentId={index?.toString() ?? ""}
                    contentContainerType="paragraphs"
                    type="twoPictureIndex"
                  />
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end gap-4">
                <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Watch Video
                  </span>
                  <div className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                </button>
                <button className="text-white uppercase tracking-widest text-sm hover:text-blue-400 transition-colors">
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {!isAddNewItem && isAdmin && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            className="w-16 h-16 bg-blue-600 rounded-full text-white shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-all hover:scale-110"
            onClick={() => setIsAddNewItem(true)}
          >
            <span className="text-3xl">+</span>
          </button>
        </div>
      )}

      {isAddNewItem && isAdmin && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-2xl p-8 rounded-2xl border border-gray-800 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8">
              Add New Interactive Section
            </h3>
            <PictureContainer
              isPictureContainerImage={false}
              isPictureContainerButton={true}
              isPictureContainerParagraph={true}
            />
            <div className="mt-8 flex justify-end gap-4">
              <button
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsAddNewItem(false)}
              >
                Cancel
              </button>
              <button
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPageItemType8;
