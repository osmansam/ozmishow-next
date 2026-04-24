import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
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

const FreqAskedType3 = ({
  freqAskedArray,
  componentStyle,
  id,
  page,
  componentType,
}: FreqAskedType) => {
  const [selection, setSelection] = useState(-1);
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();

  const handleCreate = async () => {
    await dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  const toggleSelection = (index: number) => {
    if (selection === index) {
      setSelection(-1);
    } else {
      setSelection(index);
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto my-16 px-4"
      style={componentStyle}
    >
      <div className="relative mb-8">
        <div className="absolute top-0 right-0 z-10">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            isComponentType={true}
            componentTypes={FreqAskedTypes}
            currentType={componentType}
            twoPictureId={id ?? ""}
          />
        </div>
      </div>

      <div className="space-y-4">
        {freqAskedArray.map((freqAsked, index) => {
          const { header, paragraphs, buttons, _id } = freqAsked;
          const isOpen = selection === index;

          return (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                isOpen ? "bg-gray-50 shadow-md border-blue-200" : "bg-white hover:border-blue-300"
              }`}
            >
              <div
                onClick={() => toggleSelection(index)}
                className="flex items-center justify-between p-6 cursor-pointer select-none"
              >
                <h3
                  className="text-lg font-semibold text-gray-800 flex-1 pr-8 flex items-center gap-4"
                  style={header?.style}
                >
                  {header?.content}
                  <StyleModalContainer
                    styleData={header}
                    twoPictureId={id ?? ""}
                    componentId={index?.toString() ?? ""}
                    contentContainerType="header"
                    isContentSend={true}
                    type="twoPictureIndex"
                  />
                </h3>
                <div className={`text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 border-t border-gray-100/0">
                      <div className="h-px w-full bg-gray-200 mb-4" />
                      <div className="space-y-3 text-gray-600">
                        {paragraphs?.content?.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="leading-relaxed"
                            style={paragraphs?.style}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {buttons && buttons.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-4">
                          {buttons.map((button, bIndex) => (
                            <div key={bIndex} className="relative group/btn">
                              <ButtonUnderline
                                text={button.content}
                                buttonLink={button.link}
                              />
                              <div className="absolute -top-8 left-0 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                <StyleModalContainer
                                  styleData={button}
                                  twoPictureId={id ?? ""}
                                  componentId={index?.toString() ?? ""}
                                  contentContainerType="buttons"
                                  isContentSend={true}
                                  type="twoPictureIndex"
                                  buttonIndex={bIndex}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4">
                         <ContentModalContainer
                            content={paragraphs}
                            twoPictureId={id ?? ""}
                            componentId={index?.toString() ?? ""}
                            contentContainerType="paragraphs"
                            type="twoPictureIndex"
                          />
                      </div>

                      {isAdmin && (
                        <div className="mt-4 flex justify-end">
                          <button
                            className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(
                                deleteItemInContainer({
                                  id,
                                  itemId: _id ?? "",
                                })
                              ).then(() => {
                                dispatch(getPageTwoPictures(page ?? ""));
                              });
                            }}
                          >
                            Delete Item
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {!isAddNewItem ? (
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
              onClick={() => setIsAddNewItem(true)}
            >
              + Add New Question
            </button>
          ) : (
            <div className="w-full max-w-2xl bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner">
              <h4 className="text-lg font-semibold mb-4 text-gray-700">Add New Question</h4>
              <PictureContainer
                isPictureContainerImage={false}
                isPictureContainerButton={true}
                isPictureContainerParagraph={true}
              />
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={() => setIsAddNewItem(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors"
                  onClick={handleCreate}
                >
                  Create Question
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FreqAskedType3;
