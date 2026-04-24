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

const TestimonialSliderType3 = ({
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
      className="py-16 flex flex-col w-full relative overflow-hidden"
      style={{
        ...componentStyle,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {isAdmin && (
        <div className="w-full flex justify-end mr-20 z-20">
          <ComponentStyleModalContainer
            styleData={componentStyle}
            twoPictureId={id ?? ""}
            currentType={componentType}
            isComponentType={true}
            componentTypes={TestimonialSliderTypes}
          />
        </div>
      )}
      <h1 className="font-bold text-white text-4xl text-center mb-12 z-10">
        {mainMainHeader?.content}
      </h1>
      
      <div
        className="flex flex-col py-10 px-10 w-11/12 lg:w-3/5 min-h-[400px] mx-auto relative z-10 rounded-3xl"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <div className="relative flex justify-center items-center mb-6">
          <img
            src={currentSlide?.img?.content}
            alt={currentSlide?.header?.content}
            className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-xl"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-white capitalize mb-2">
          {currentSlide?.name?.content + " " + currentSlide?.lastName?.content}
        </h2>
        <p className="text-center text-white/80 font-medium mb-6">
          {currentSlide?.title?.content}
        </p>
        {currentSlide?.paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className="font-normal leading-7 text-base text-center px-8 py-2 text-white/90"
          >
            {paragraph}
          </p>
        ))}
        
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            className="text-3xl text-white hover:text-white/70 transition-all bg-white/20 rounded-full p-3 backdrop-blur-sm hover:bg-white/30"
            onClick={handlePrev}
          >
            <FiChevronLeft />
          </button>
          <div className="flex gap-2">
            {sliderArray.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === index ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            className="text-3xl text-white hover:text-white/70 transition-all bg-white/20 rounded-full p-3 backdrop-blur-sm hover:bg-white/30"
            onClick={handleNext}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {!isAddSlider && isAdmin && (
        <button
          className="capitalize border-2 border-white text-white rounded-lg cursor-pointer w-fit p-2 mx-auto mt-8 hover:bg-white/20 z-10"
          onClick={() => setIsAddSlider(true)}
        >
          Add New Item
        </button>
      )}

      {isAddSlider && isAdmin && (
        <div className="z-10">
          <AddSliderItem
            isPictureContainerImage={true}
            isPictureContainerButton={false}
            isPictureContainerParagraph={true}
          />
          <button
            className="capitalize border-2 border-white text-white w-fit p-2 rounded-lg mx-auto mt-4 hover:bg-white/20"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialSliderType3;
