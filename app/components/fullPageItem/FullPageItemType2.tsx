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

const FullPageItemType2 = ({
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
    <div
      className="w-full max-w-4xl mx-auto py-20 px-8 bg-white"
      style={componentStyle}
    >
      <div className="w-full flex justify-end mb-4">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type2"
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

      <h1
        className="text-5xl font-light tracking-tight text-gray-900 mb-12 border-b border-gray-100 pb-4"
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

      <div className="space-y-24">
        {fullPageItemArray.map((fullPageItem, index) => {
          const { header, paragraphs, img } = fullPageItem;
          return (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-12 items-start"
            >
              {img?.content && (
                <div className="w-full md:w-1/2 relative group">
                  <img
                    src={img?.content}
                    alt={header?.content}
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    style={img?.style}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageStyleModalContainer
                      twoPictureId={id ?? ""}
                      componentId={index.toString()}
                      type="twoPictureIndex"
                      styleData={img}
                    />
                  </div>
                </div>
              )}

              <div className="w-full md:w-1/2 space-y-6">
                <h2
                  className="text-3xl font-thin text-gray-800"
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
                  className="text-lg text-gray-600 leading-relaxed font-light"
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
            </div>
          );
        })}
      </div>

      {!isAddNewItem && isAdmin && (
        <button
          className="mt-16 px-6 py-2 border border-gray-300 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors duration-300 text-sm uppercase tracking-widest"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New Section
        </button>
      )}

      {isAddNewItem && isAdmin && (
        <div className="mt-12 p-8 border border-gray-100 bg-gray-50">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
            isPictureContainerParagraph={true}
          />
          <button
            className="mt-6 px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
            onClick={handleCreate}
          >
            Create Section
          </button>
        </div>
      )}
    </div>
  );
};

export default FullPageItemType2;
