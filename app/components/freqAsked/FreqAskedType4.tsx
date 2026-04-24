import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    deleteItemInContainer,
    getPageTwoPictures,
    resetTwoPictureArray,
    updateContainer,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import { FreqAskedTypes } from "../../shared/compenentTypes";
import { FreqAskedType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import ButtonUnderline from "../buttonUnderline/ButtonUnderline";

const FreqAskedType4 = ({
  freqAskedArray,
  componentStyle,
  id,
  page,
  componentType,
}: FreqAskedType) => {
  const [selection, setSelection] = useState(0);
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();

  // Ensure selection is valid when array changes
  useEffect(() => {
    if (freqAskedArray.length > 0 && selection >= freqAskedArray.length) {
      setSelection(0);
    }
  }, [freqAskedArray.length, selection]);

  const handleCreate = async () => {
    await dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto my-16 px-4"
      style={componentStyle}
    >
      <div className="relative mb-8 flex justify-end">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          componentTypes={FreqAskedTypes}
          currentType={componentType}
          twoPictureId={id ?? ""}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[400px]">
        {/* Left Side: Questions List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2">
          {freqAskedArray.map((freqAsked, index) => {
            const { header } = freqAsked;
            const isSelected = selection === index;

            return (
              <div
                key={index}
                onClick={() => setSelection(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-100"
                }`}
              >
                <h3
                  className="font-medium text-lg flex items-center gap-2"
                  style={header?.style}
                >
                  {header?.content}
                  <div className={isSelected ? "text-white" : "text-gray-400"}>
                     <StyleModalContainer
                      styleData={header}
                      twoPictureId={id ?? ""}
                      componentId={index?.toString() ?? ""}
                      contentContainerType="header"
                      isContentSend={true}
                      type="twoPictureIndex"
                    />
                  </div>
                </h3>
                <FaChevronRight
                  className={`text-sm transition-transform duration-300 ${
                    isSelected ? "text-white translate-x-1" : "text-gray-300 group-hover:text-gray-400"
                  }`}
                />
              </div>
            );
          })}

          {isAdmin && !isAddNewItem && (
            <button
              className="mt-4 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors text-center font-medium"
              onClick={() => setIsAddNewItem(true)}
            >
              + Add New Question
            </button>
          )}
        </div>

        {/* Right Side: Answer Content */}
        <div className="w-full lg:w-2/3 bg-gray-50 rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {freqAskedArray[selection] && (
              <motion.div
                key={selection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {freqAskedArray[selection].header?.content}
                  </h2>
                  <div className="w-20 h-1 bg-blue-600 rounded-full" />
                </div>

                <div className="flex-grow space-y-4 text-gray-600 text-lg leading-relaxed">
                  {freqAskedArray[selection].paragraphs?.content?.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      style={freqAskedArray[selection].paragraphs?.style}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    {freqAskedArray[selection].buttons?.map((button, bIndex) => (
                      <div key={bIndex} className="relative group/btn">
                        <ButtonUnderline
                          text={button.content}
                          buttonLink={button.link}
                        />
                         <div className="absolute -top-8 left-0 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                            <StyleModalContainer
                              styleData={button}
                              twoPictureId={id ?? ""}
                              componentId={selection?.toString() ?? ""}
                              contentContainerType="buttons"
                              isContentSend={true}
                              type="twoPictureIndex"
                              buttonIndex={bIndex}
                            />
                          </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 items-center">
                     <ContentModalContainer
                        content={freqAskedArray[selection].paragraphs}
                        twoPictureId={id ?? ""}
                        componentId={selection?.toString() ?? ""}
                        contentContainerType="paragraphs"
                        type="twoPictureIndex"
                      />
                    {isAdmin && (
                      <button
                        className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
                        onClick={() => {
                          dispatch(
                            deleteItemInContainer({
                              id,
                              itemId: freqAskedArray[selection]._id ?? "",
                            })
                          ).then(() => {
                            dispatch(getPageTwoPictures(page ?? ""));
                          });
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {freqAskedArray.length === 0 && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select or add a question to view details
            </div>
          )}
        </div>
      </div>

      {/* Add New Item Form */}
      {isAddNewItem && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Question</h3>
            <PictureContainer
              isPictureContainerImage={false}
              isPictureContainerButton={true}
              isPictureContainerParagraph={true}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsAddNewItem(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

export default FreqAskedType4;
