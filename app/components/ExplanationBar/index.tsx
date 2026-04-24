import { useState } from "react";
import { useSelector } from "react-redux";
import {
    deleteItemInContainer,
    getPageTwoPictures,
    resetTwoPictureArray,
    updateExplanationBar,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { ExplanationBarType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import AddExplanationItem from "./AddExplanationItem";

const ExplanationBar = ({
  mainMainHeader,
  explanationArray,
  componentStyle,
  id,
  page,
}: ExplanationBarType) => {
  const [isAddExplanationItem, setIsAddExplanationItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [barSelection, setBarSelection] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();

  //handle create new explanation item
  const handleCreate = async () => {
    await dispatch(updateExplanationBar({ container: twoPictureArray, id }));
    setIsAddExplanationItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" style={componentStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            twoPictureId={id ?? ""}
            currentType="type1"
            isComponentType={false}
          />
        </div>

        <div className="mb-12 text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 inline-flex items-center gap-4"
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Tabs Section */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-2">
              {explanationArray.map((explanation, index) => {
                const { mainHeader } = explanation;
                const explanationId = explanation._id;
                const isSelected = index === barSelection;

                return (
                  <div
                    key={index}
                    className={`group relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "bg-gray-900 text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => setBarSelection(index)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    style={
                      mainHeader?.style
                        ? {
                            ...mainHeader.style,
                            color: isSelected
                              ? "#ffffff"
                              : mainHeader.style.color,
                          }
                        : {}
                    }
                  >
                    <span className="flex-grow font-medium text-lg capitalize">
                      {mainHeader?.content}
                    </span>
                    
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <StyleModalContainer
                        styleData={mainHeader}
                        twoPictureId={id}
                        componentId={explanationId ? explanationId : ""}
                        contentContainerType="mainHeader"
                        isContentSend={true}
                        type="explanationBar"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {!isAddExplanationItem && isAdmin && (
              <button
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-medium shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                onClick={() => setIsAddExplanationItem(true)}
              >
                <span>+</span> Add New Item
              </button>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden min-h-[500px]">
              {isAddExplanationItem && isAdmin ? (
                <div className="p-8">
                  <div className="mb-6 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Add New Item</h3>
                    <button
                      onClick={() => setIsAddExplanationItem(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <AddExplanationItem
                    isPictureContainerImage={true}
                    isPictureContainerButton={false}
                    isPictureContainerParagraph={true}
                  />
                  <div className="mt-6 flex gap-4 justify-end">
                    <button
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      onClick={() => setIsAddExplanationItem(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                      onClick={handleCreate}
                    >
                      Create Item
                    </button>
                  </div>
                </div>
              ) : (
                explanationArray[barSelection] && (
                  <div className="flex flex-col h-full animate-fadeIn">
                    {/* Image Area */}
                    {explanationArray[barSelection].img && (
                      <div className="relative w-full h-64 sm:h-80 lg:h-96 group">
                        {explanationArray[barSelection].img?.content && (
                          <img
                            src={explanationArray[barSelection].img?.content}
                            alt="explanation"
                            className="w-full h-full object-cover"
                            style={{
                              ...explanationArray[barSelection].img?.style,
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                        <div className="absolute top-4 right-4">
                          <ImageStyleModalContainer
                            twoPictureId={id ?? ""}
                            componentId={explanationArray[barSelection]._id ?? ""}
                            type="explanationBar"
                            styleData={explanationArray[barSelection].img}
                          />
                        </div>
                      </div>
                    )}

                    {/* Text Area */}
                    <div className="p-8 flex flex-col gap-6 flex-grow">
                      <div className="flex justify-between items-start">
                        <h2
                          className="text-2xl md:text-3xl font-bold text-gray-900 capitalize"
                          style={explanationArray[barSelection].header?.style}
                        >
                          {explanationArray[barSelection].header?.content}
                          <span className="inline-block ml-3 align-middle">
                            <StyleModalContainer
                              styleData={explanationArray[barSelection].header}
                              twoPictureId={id}
                              componentId={explanationArray[barSelection]._id ?? ""}
                              contentContainerType="header"
                              isContentSend={true}
                              type="explanationBar"
                            />
                          </span>
                        </h2>
                        
                        {isAdmin && (
                          <button
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete Item"
                            onClick={async () => {
                              try {
                                await dispatch(
                                  deleteItemInContainer({
                                    id,
                                    itemId: explanationArray[barSelection]?._id ?? "",
                                  })
                                );
                                setBarSelection(0);
                                dispatch(getPageTwoPictures(page ?? ""));
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                        {explanationArray[barSelection].paragraphs?.content?.map(
                          (paragraph, index) => (
                            <p
                              key={index}
                              style={explanationArray[barSelection].paragraphs?.style}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                        <div className="mt-2">
                          <ContentModalContainer
                            content={explanationArray[barSelection].paragraphs}
                            twoPictureId={id}
                            componentId={explanationArray[barSelection]._id ?? ""}
                            contentContainerType="paragraphs"
                            type="explanationBar"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationBar;
