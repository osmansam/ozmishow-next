import React from "react";
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

const FullPageItemType7 = ({
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

  const handleCreate = async () => {
    await dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  return (
    <div className="w-full" style={componentStyle}>
      <div className="absolute top-4 right-4 z-50">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type7"
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

      {/* Main Header Section (if exists) */}
      {mainMainHeader?.content && (
        <div className="bg-black text-white py-12 text-center">
          <h1
            className="text-5xl font-bold tracking-wider uppercase"
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
          </h1>
        </div>
      )}

      {fullPageItemArray.map((fullPageItem, index) => {
        const { header, paragraphs, img } = fullPageItem;
        return (
          <div
            key={index}
            className="relative w-full min-h-[600px] flex items-end justify-start overflow-hidden border-b-4 border-white group"
          >
            {/* Background Image */}
            {img?.content && (
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={img?.content}
                  alt={header?.content}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={img?.style}
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 z-20">
                  <ImageStyleModalContainer
                    twoPictureId={id ?? ""}
                    componentId={index.toString()}
                    type="twoPictureIndex"
                    styleData={img}
                  />
                </div>
              </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-20 pt-32 text-white">
              <div className="border-l-4 border-yellow-500 pl-6 md:pl-8">
                <h2
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
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
                  className="text-lg md:text-xl font-light mb-8 max-w-3xl drop-shadow-md text-gray-200"
                  style={paragraphs?.style}
                >
                  {paragraphs?.content?.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 last:mb-0 leading-relaxed">
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

                <button className="px-8 py-3 bg-yellow-500 text-black font-bold text-base uppercase tracking-widest hover:bg-yellow-400 transition-colors duration-300 rounded-sm">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {!isAddNewItem && isAdmin && (
        <div className="py-12 bg-gray-900 text-center">
          <button
            className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest"
            onClick={() => setIsAddNewItem(true)}
          >
            Add New Hero Section
          </button>
        </div>
      )}

      {isAddNewItem && isAdmin && (
        <div className="bg-gray-100 py-16 px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center uppercase">
              New Hero Section
            </h3>
            <PictureContainer
              isPictureContainerImage={false}
              isPictureContainerButton={true}
              isPictureContainerParagraph={true}
            />
            <div className="mt-8 flex justify-center gap-4">
              <button
                className="px-8 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 uppercase text-sm"
                onClick={() => setIsAddNewItem(false)}
              >
                Cancel
              </button>
              <button
                className="px-8 py-3 bg-black text-white hover:bg-gray-800 uppercase text-sm"
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

export default FullPageItemType7;
