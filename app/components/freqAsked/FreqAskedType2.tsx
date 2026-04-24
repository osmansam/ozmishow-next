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

const FreqAskedType2 = ({
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
      className="w-4/5 mx-auto my-10 h-full py-10 px-4 cursor-pointer shadow-lg bg-white rounded-lg"
      id="freqAskedContainer"
      style={componentStyle}
    >
      <div className="w-full flex justify-end mr-20">
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
            className="border-b border-gray-200 py-4 hover:bg-gray-100 transition-colors duration-300 rounded-lg"
          >
            <h1
              className="font-semibold text-lg text-blue-700 flex flex-row gap-8 hover:text-blue-900 transition-colors duration-300"
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
                className="overflow-hidden bg-gray-100 rounded-lg "
                initial={{ height: 0 }}
                animate={{ height: selection === index ? "auto" : 0 }}
                transition={{ duration: 0.5 }}
              >
                {paragraphs?.content?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-gray-600 leading-6"
                    style={paragraphs?.style ? paragraphs?.style : {}}
                  >
                    {paragraph}
                  </p>
                ))}

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
                className="capitalize border border-red-400 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-red-500 hover:text-white transition-colors duration-300"
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
          </div>
        );
      })}

      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 border-blue-500 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-blue-500 hover:text-white transition-colors duration-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
            isPictureContainerParagraph={true}
          />
          <button
            className="capitalize border-2 border-green-500 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-green-500 hover:text-white transition-colors duration-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default FreqAskedType2;
