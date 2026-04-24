import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    resetTwoPictureArray,
    updateSlider,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { TestimonialSliderTypes } from "../../shared/compenentTypes";
import { SliderType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import AddSliderItem from "../slider/AddSliderItem";

const TestimonialSliderType2 = ({
  mainMainHeader,
  sliderArray,
  id,
  componentStyle,
  componentType,
  page,
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
      className="py-16 flex flex-col mx-auto justify-center items-center w-full bg-gray-50"
      style={componentStyle}
    >
      {isAdmin && (
        <div className="w-full flex justify-end mr-20">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            twoPictureId={id ?? ""}
            currentType={componentType}
            isComponentType={true}
            componentTypes={TestimonialSliderTypes}
          />
        </div>
      )}
      <h1 className="font-semibold text-gray-900 text-5xl text-center mb-4 uppercase tracking-tight">
        {mainMainHeader?.content}
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-12"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto">
        {sliderArray.map((item, itemIndex) => {
          const { img, header, paragraphs, name, lastName } = item;
          return (
            <div
              key={itemIndex}
              className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={img?.content}
                  alt={header?.content}
                  className="h-16 w-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800 capitalize">
                    {name?.content + " " + lastName?.content}
                  </h2>
                  <p className="text-sm text-gray-500">{header?.content}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {paragraphs?.content?.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-normal leading-6 text-sm text-gray-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          );
        })}
      </div>

      {!isAddSlider && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2 mx-auto mt-8 hover:bg-slate-300"
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
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialSliderType2;
