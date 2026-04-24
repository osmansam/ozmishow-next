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

const FullPageItemType4 = ({
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
    <div className="w-full bg-gray-100 py-12 px-4" style={componentStyle}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-8">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            twoPictureId={id ?? ""}
            currentType="type4"
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

        <div className="bg-white rounded-lg shadow-md p-8 mb-10 border-l-8 border-indigo-600">
          <h1
            className="text-4xl font-bold text-gray-800"
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

        <div className="flex flex-col gap-10">
          {fullPageItemArray.map((fullPageItem, index) => {
            const { header, paragraphs, img } = fullPageItem;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 flex flex-col md:flex-row"
              >
                {img?.content && (
                  <div className="relative h-64 md:h-auto md:w-1/3 bg-indigo-100">
                    <img
                      src={img?.content}
                      alt={header?.content}
                      className="w-full h-full object-cover"
                      style={img?.style}
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                      <ImageStyleModalContainer
                        twoPictureId={id ?? ""}
                        componentId={index.toString()}
                        type="twoPictureIndex"
                        styleData={img}
                      />
                    </div>
                  </div>
                )}

                <div className="p-8 md:w-2/3">
                  <h2
                    className="text-2xl font-bold text-indigo-700 mb-4"
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

                  <div className="text-gray-600" style={paragraphs?.style}>
                    {paragraphs?.content?.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="mb-3 last:mb-0 leading-relaxed"
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

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button className="text-indigo-600 font-semibold hover:text-indigo-800 uppercase text-sm tracking-wide">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isAddNewItem && isAdmin && (
          <div className="mt-10 flex justify-center">
            <button
              className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all font-bold uppercase tracking-wider"
              onClick={() => setIsAddNewItem(true)}
            >
              + Add New Item
            </button>
          </div>
        )}

        {isAddNewItem && isAdmin && (
          <div className="mt-10 bg-white p-8 rounded-lg shadow-xl border-t-4 border-indigo-500">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Create New Material Card
            </h3>
            <PictureContainer
              isPictureContainerImage={false}
              isPictureContainerButton={true}
              isPictureContainerParagraph={true}
            />
            <div className="mt-8 flex justify-end gap-4">
              <button
                className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded"
                onClick={() => setIsAddNewItem(false)}
              >
                CANCEL
              </button>
              <button
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded shadow hover:bg-indigo-700"
                onClick={handleCreate}
              >
                CREATE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPageItemType4;
