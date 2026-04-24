import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
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

const TestimonialSliderType1 = ({
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

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === sliderArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderArray.length]);

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
      className="py-16 flex flex-col w-full bg-gradient-to-br from-blue-50 to-purple-50"
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
      <h1 className="font-bold text-gray-800 text-4xl text-center mb-12">
        {mainMainHeader?.content}
      </h1>
      <div className="flex flex-col py-8 px-8 shadow-2xl bg-white rounded-2xl w-11/12 lg:w-3/5 min-h-[450px] mx-auto relative overflow-hidden">
        <div className="absolute top-6 right-6 text-blue-200 text-6xl opacity-30">
          <FaQuoteRight />
        </div>
        <div className="relative flex justify-center items-center mb-6 z-10">
          <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 blur-xl opacity-50"></div>
          <img
            src={currentSlide?.img?.content}
            alt={currentSlide?.header?.content}
            className="w-32 h-32 rounded-full z-10 object-cover border-4 border-white shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 capitalize mb-2">
          {currentSlide?.name?.content + " " + currentSlide?.lastName?.content}
        </h2>
        <p className="text-center text-blue-600 font-medium mb-6">
          {currentSlide?.title?.content}
        </p>
        {currentSlide?.paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className="font-normal leading-7 text-base text-center px-8 py-2 text-gray-600 italic"
          >
            "{paragraph}"
          </p>
        ))}
        <div className="flex justify-center items-center gap-2 mt-6">
          {sliderArray.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === index ? "w-8 bg-blue-500" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-6">
          <button
            className="text-3xl text-blue-500 hover:text-blue-700 transition-colors bg-white rounded-full p-2 shadow-md hover:shadow-lg"
            onClick={handlePrev}
          >
            <FiChevronLeft />
          </button>
          <button
            className="text-3xl text-blue-500 hover:text-blue-700 transition-colors bg-white rounded-full p-2 shadow-md hover:shadow-lg"
            onClick={handleNext}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {!isAddSlider && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2 mx-auto mt-4 hover:bg-slate-300"
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

export default TestimonialSliderType1;
