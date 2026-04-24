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

const FullPageItemType6 = ({
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
      className="w-full bg-[#fffbf0] py-16 px-6 overflow-hidden"
      style={componentStyle}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="relative z-10">
          <div className="flex justify-end mb-8">
            <ComponentStyleModalContainer
              styleData={componentStyle}
              twoPictureId={id ?? ""}
              currentType="type6"
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

          <div className="text-center mb-20">
            <h1
              className="font-black text-5xl md:text-7xl text-gray-900 mb-6 tracking-tight"
              style={mainMainHeader?.style}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {mainMainHeader?.content}
              </span>
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

          <div className="space-y-24">
            {fullPageItemArray.map((fullPageItem, index) => {
              const { header, paragraphs, img } = fullPageItem;

              return (
                <div
                  key={index}
                  className="flex flex-col gap-8 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/50"
                >
                  {img?.content && (
                    <div className="w-full relative">
                      <div className="relative z-10 transform transition-transform hover:scale-[1.02] duration-500">
                        <img
                          src={img?.content}
                          alt={header?.content}
                          className="w-full h-auto drop-shadow-xl rounded-2xl max-h-[600px] object-cover"
                          style={img?.style}
                        />
                        <div className="absolute top-4 right-4">
                          <ImageStyleModalContainer
                            twoPictureId={id ?? ""}
                            componentId={index.toString()}
                            type="twoPictureIndex"
                            styleData={img}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-full">
                    <h2
                      className="text-3xl font-extrabold text-gray-800 mb-4 leading-tight"
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
                      className="text-lg text-gray-600 font-medium leading-relaxed"
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

                    <button className="mt-6 px-8 py-3 rounded-full font-bold text-white shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-pink-500 to-violet-500">
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!isAddNewItem && isAdmin && (
            <div className="mt-24 text-center">
              <button
                className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold text-xl shadow-xl hover:bg-gray-800 transition-all hover:scale-105"
                onClick={() => setIsAddNewItem(true)}
              >
                Add Another Story
              </button>
            </div>
          )}

          {isAddNewItem && isAdmin && (
            <div className="mt-24 bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border-2 border-white">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Create New Story Section
              </h3>
              <PictureContainer
                isPictureContainerImage={false}
                isPictureContainerButton={true}
                isPictureContainerParagraph={true}
              />
              <div className="mt-10 flex justify-center gap-6">
                <button
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                  onClick={() => setIsAddNewItem(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  onClick={handleCreate}
                >
                  Create Story
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPageItemType6;
