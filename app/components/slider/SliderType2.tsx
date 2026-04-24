import { useState } from "react";
import { useSelector } from "react-redux";
import {
  resetTwoPictureArray,
  updateSlider,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { SliderTypes } from "../../shared/compenentTypes";
import { SliderType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import AddSliderItem from "./AddSliderItem";

const SliderType2 = ({
  mainMainHeader,
  sliderArray,
  id,
  componentStyle,
  componentType,
}: SliderType) => {
  const dispatch = useAppDispatch();
  const [isAddSlider, setIsAddSlider] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );

  const handleCreate = async () => {
    await dispatch(updateSlider({ container: twoPictureArray, id }));
    setIsAddSlider(false);
    dispatch(resetTwoPictureArray());
    window.location.reload();
  };

  return (
    <div
      className="py-10 flex flex-col mx-auto justify-center items-center w-full gap-24"
      style={componentStyle}
    >
      {isAdmin && (
        <div className=" w-full flex justify-end mr-20 ">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            twoPictureId={id ?? ""}
            currentType={componentType}
            isComponentType={true}
            componentTypes={SliderTypes}
          />
        </div>
      )}
      <h1 className="w-fit font-[500] text-[#102a42] text-5xl flex uppercase  px-4 mx-auto ">
        {mainMainHeader?.content}
      </h1>
      {/* container part */}
      <div className="flex flex-row flex-wrap mx-auto gap-4 justify-center  px-4">
        {sliderArray.map((item, itemIndex) => {
          const { img, header, paragraphs, name, lastName } = item;
          return (
            <div className="flex flex-col gap-2 ">
              {/* img */}
              <img
                src={img?.content}
                alt={header?.content}
                className="h-40 w-40 rounded-full mx-auto grayscale"
              />
              {/* paragraphs */}
              {paragraphs?.content?.map((paragraph, index) => (
                <p
                  key={index}
                  className="w-80 font-[400] leading-6 text-sm text-center px-6 py-2"
                >
                  {`"${paragraph}"`}
                </p>
              ))}
              <h2 className="text-lg leading-7 font-[450]  text-center text-[#102a42] uppercase p-1">
                {name?.content + "  " + lastName?.content}
              </h2>
            </div>
          );
        })}
      </div>

      {!isAddSlider && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddSlider(true)}
        >
          Add New Item
        </button>
      )}

      {isAddSlider && isAdmin && (
        <div>
          <AddSliderItem
            isPictureContainerImage={true}
            isPictureContainerButton={false}
            isPictureContainerParagraph={true}
          />
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default SliderType2;
