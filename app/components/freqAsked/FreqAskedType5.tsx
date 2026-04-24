import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
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

const FreqAskedType5 = ({
  freqAskedArray,
  componentStyle,
  id,
  page,
  componentType,
}: FreqAskedType) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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

  return (
    <div
      className="w-full max-w-7xl mx-auto my-16 px-4"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {freqAskedArray.map((freqAsked, index) => {
            const { header, paragraphs, buttons, _id } = freqAsked;
            const isExpanded = expandedId === _id;

            return (
              <motion.div
                key={_id || index}
                layout
                onClick={() => setExpandedId(isExpanded ? null : _id ?? null)}
                className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-shadow hover:shadow-md ${
                  isExpanded ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 ring-2 ring-blue-500 border-transparent" : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3
                      className={`font-bold text-gray-800 flex-1 flex items-center gap-2 ${isExpanded ? "text-2xl" : "text-lg"}`}
                      style={header?.style}
                    >
                      {header?.content}
                      <div onClick={(e) => e.stopPropagation()}>
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
                    {isExpanded && (
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className={`space-y-3 text-gray-600 ${!isExpanded && "line-clamp-3"}`}>
                    {paragraphs?.content?.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        style={paragraphs?.style}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-4"
                    >
                      {buttons && buttons.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {buttons.map((button, bIndex) => (
                            <div key={bIndex} className="relative group/btn" onClick={(e) => e.stopPropagation()}>
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

                      <div className="flex justify-between items-center mt-2" onClick={(e) => e.stopPropagation()}>
                         <ContentModalContainer
                            content={paragraphs}
                            twoPictureId={id ?? ""}
                            componentId={index?.toString() ?? ""}
                            contentContainerType="paragraphs"
                            type="twoPictureIndex"
                          />
                        
                        {isAdmin && (
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
                            Delete
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {!isExpanded && (
                    <div className="mt-auto pt-4 text-blue-600 text-sm font-medium">
                      Read more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isAdmin && (
          <motion.div
            layout
            className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors min-h-[200px]"
            onClick={() => setIsAddNewItem(true)}
          >
            <div className="text-4xl text-gray-300 mb-2">+</div>
            <span className="text-gray-500 font-medium">Add New Card</span>
          </motion.div>
        )}
      </div>

      {/* Add New Item Form */}
      {isAddNewItem && isAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Card</h3>
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

export default FreqAskedType5;
