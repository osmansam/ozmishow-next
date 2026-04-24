import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

const TestimonialSliderType5 = ({
  mainMainHeader,
  sliderArray,
  id,
  componentStyle,
  componentType,
  page,
}: SliderType) => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const itemsToShow = 3;
  const maxIndex = Math.max(0, sliderArray.length - itemsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleItems = sliderArray.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <div
      className="py-16 flex flex-col w-full bg-gradient-to-b from-indigo-50 to-white"
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
      <h1 className="font-bold text-gray-900 text-4xl text-center mb-12">
        {mainMainHeader?.content}
      </h1>

      <div className="relative max-w-7xl mx-auto px-8 w-full">
        <div className="flex gap-6 overflow-hidden">
          {visibleItems.map((item, idx) => {
            const { img, header, paragraphs, name, lastName } = item;
            const actualIndex = currentIndex + idx;
            return (
              <div
                key={actualIndex}
                className="flex-shrink-0 w-full md:w-1/3 transition-all duration-500"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-md opacity-50"></div>
                      <img
                        src={img?.content}
                        alt={header?.content}
                        className="relative h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 capitalize text-center">
                      {name?.content + " " + lastName?.content}
                    </h2>
                    <p className="text-sm text-indigo-600 font-medium text-center">
                      {header?.content}
                    </p>
                  </div>

                  <div className="flex-1">
                    {paragraphs?.content?.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-normal leading-6 text-sm text-gray-600 mb-3"
                      >
                        "{paragraph}"
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sliderArray.length > itemsToShow && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed text-indigo-600 hover:text-indigo-800"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed text-indigo-600 hover:text-indigo-800"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </>
        )}
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

export default TestimonialSliderType5;
