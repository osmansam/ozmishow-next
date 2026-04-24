import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

const FreqAsked = ({
  freqAskedArray,
  componentStyle,
  id,
  componentType,
  page,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const freqAskedContainer = document.getElementById("freqAskedContainer");
      if (
        freqAskedContainer &&
        !freqAskedContainer.contains(event.target as Node)
      ) {
        setSelection(-1);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-4/5 mx-auto my-10 h-full py-10  px-4 cursor-pointer"
      id="freqAskedContainer"
      style={componentStyle}
    >
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          componentTypes={FreqAskedTypes}
          currentType={componentType}
          twoPictureId={id ?? ""}
        />
      </div>
      {freqAskedArray.map((freqAsked, index) => {
        const { header, paragraphs, buttons, _id } = freqAsked;
        return (
          <div
            key={index}
            onClick={() => setSelection(index)}
            className="h-fit w-full rounded-lg  cursor-pointer"
          >
            <h1
              className="font-[500] pt-2  text-[#333333] flex flex-row gap-8"
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
            </h1>
            {selection === index && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: selection === index ? "auto" : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col gap-2 w-full rounded-lg py-1 px-4 mt-2 ">
                  {paragraphs?.content?.map((paragraph, index) => (
                    <p
                      key={index}
                      className=" font-[400] leading-6 text-[#333333]"
                      style={paragraphs?.style ? paragraphs?.style : {}}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {buttons &&
                  buttons.length > 0 &&
                  buttons.map((button, index) => (
                    <div
                      className=" px-4 flex flex-row w-fit items-center justify-center gap-2 "
                      key={index}
                      style={button.style}
                    >
                      <ButtonUnderline
                        text={button.content}
                        buttonLink={button.link}
                      />
                      <StyleModalContainer
                        styleData={button}
                        twoPictureId={id ?? ""}
                        componentId={index?.toString() ?? ""}
                        contentContainerType="buttons"
                        isContentSend={true}
                        type="twoPictureIndex"
                        buttonIndex={index}
                      />
                    </div>
                  ))}
              </motion.div>
            )}
            <ContentModalContainer
              content={paragraphs}
              twoPictureId={id ?? ""}
              componentId={index?.toString() ?? ""}
              contentContainerType="paragraphs"
              type="twoPictureIndex"
            />

            {isAdmin && selection === index && (
              <button
                className="w-fit capitalize border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-100"
                onClick={async () => {
                  try {
                    await dispatch(
                      deleteItemInContainer({
                        id,
                        itemId: _id ?? "",
                      })
                    );
                    dispatch(getPageTwoPictures(page ?? ""));
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Delete
              </button>
            )}
            {/* Underline color #e2e2e2 */}
            <div className="mx-auto h-px mt-4 font-[700] bg-freqUnderline"></div>
          </div>
        );
      })}

      {!isAddNewItem && isAdmin && (
        <div className="flex justify-center items-center mt-4">
          <button
            className=" w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
            onClick={() => setIsAddNewItem(true)}
          >
            Add New item
          </button>
        </div>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
            isPictureContainerParagraph={true}
          />
          <div className="w-5/6 mx-auto my-2 flex flex-row gap-4">
            <button
              className="w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
              onClick={handleCreate}
            >
              Create
            </button>
            <button
              className="w-fit capitalize border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-100"
              onClick={() => setIsAddNewItem(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreqAsked;
