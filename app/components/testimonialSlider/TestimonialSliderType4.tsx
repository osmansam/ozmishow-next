import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
    getPageTwoPictures,
    resetTwoPictureArray,
    updateSlider,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { TestimonialSliderTypes } from "../../shared/compenentTypes";
import { SliderType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import AddSliderItem from "../slider/AddSliderItem";

const TestimonialSliderType4 = ({
  mainMainHeader,
  sliderArray,
  id,
  componentStyle,
  componentType,
  page,
}: SliderType) => {
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [isAddSlider, setIsAddSlider] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );

  useEffect(() => {
    const lastIndex = sliderArray.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sliderArray.length]);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? sliderArray.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === sliderArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCreate = async () => {
    await dispatch(updateSlider({ container: twoPictureArray, id }));
    setIsAddSlider(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  const currentSlide = sliderArray[index];

  return (
    <div
      className="py-16 flex flex-col w-full bg-white"
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
      
      <div className="flex flex-col lg:flex-row gap-8 w-11/12 lg:w-4/5 mx-auto bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="lg:w-2/5 relative overflow-hidden">
          <img
            src={currentSlide?.img?.content}
            alt={currentSlide?.header?.content}
            className="w-full h-full object-cover min-h-[400px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div className="lg:w-3/5 p-10 flex flex-col justify-center">
          <div className="mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mb-4"></div>
            <h2 className="text-3xl font-bold text-gray-800 capitalize mb-2">
              {currentSlide?.name?.content + " " + currentSlide?.lastName?.content}
            </h2>
            <p className="text-lg text-orange-600 font-medium">
              {currentSlide?.title?.content}
            </p>
          </div>
          
          {currentSlide?.paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className="font-normal leading-7 text-base text-gray-700 mb-4"
            >
              {paragraph}
            </p>
          ))}
          
          <div className="flex items-center gap-4 mt-6">
            <button
              className="text-2xl text-orange-500 hover:text-orange-700 transition-colors bg-white rounded-full p-2 shadow-md"
              onClick={handlePrev}
            >
              <FiChevronLeft />
            </button>
            <div className="flex gap-2 flex-1 justify-center">
              {sliderArray.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === index ? "w-8 bg-orange-500" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              className="text-2xl text-orange-500 hover:text-orange-700 transition-colors bg-white rounded-full p-2 shadow-md"
              onClick={handleNext}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
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

export default TestimonialSliderType4;
