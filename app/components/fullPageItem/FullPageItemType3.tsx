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

const FullPageItemType3 = ({
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
      className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8"
      style={componentStyle}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            twoPictureId={id ?? ""}
            currentType="type3"
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

        <div className="text-center mb-16">
          <h1
            className="text-4xl font-bold text-slate-900 sm:text-5xl md:text-6xl"
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
          <div className="mt-4 max-w-2xl mx-auto h-1 bg-blue-600 rounded-full w-24"></div>
        </div>

        <div className="flex flex-col gap-12">
          {fullPageItemArray.map((fullPageItem, index) => {
            const { header, paragraphs, img } = fullPageItem;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
              >
                {img?.content && (
                  <div className="h-64 md:h-auto md:w-2/5 relative overflow-hidden">
                    <img
                      src={img?.content}
                      alt={header?.content}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      style={img?.style}
                    />
                    <div className="absolute top-2 right-2">
                      <ImageStyleModalContainer
                        twoPictureId={id ?? ""}
                        componentId={index.toString()}
                        type="twoPictureIndex"
                        styleData={img}
                      />
                    </div>
                  </div>
                )}

                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <h3
                    className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2"
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
                  </h3>

                  <div
                    className="text-slate-600 flex-1"
                    style={paragraphs?.style}
                  >
                    {paragraphs?.content?.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="mb-3 last:mb-0 text-sm leading-relaxed"
                      >
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
          <div className="mt-12 text-center">
            <button
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsAddNewItem(true)}
            >
              Add New Card
            </button>
          </div>
        )}

        {isAddNewItem && isAdmin && (
          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-medium text-slate-900 mb-6">
              Create New Card
            </h3>
            <PictureContainer
              isPictureContainerImage={false}
              isPictureContainerButton={true}
              isPictureContainerParagraph={true}
            />
            <div className="mt-6 flex justify-end">
              <button
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-md mr-4 hover:bg-slate-200"
                onClick={() => setIsAddNewItem(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPageItemType3;
