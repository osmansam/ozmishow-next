import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlay } from "react-icons/fi";
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

const TestimonialSliderType6 = ({
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
      className="py-16 flex flex-col w-full bg-gray-900"
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
      <h1 className="font-bold text-white text-4xl text-center mb-12">
        {mainMainHeader?.content}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-11/12 lg:w-4/5 mx-auto">
        <div className="lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src={currentSlide?.img?.content}
            alt={currentSlide?.header?.content}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
              <FiPlay className="text-white text-4xl" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-2xl font-bold text-white capitalize">
              {currentSlide?.name?.content + " " + currentSlide?.lastName?.content}
            </h2>
            <p className="text-lg text-gray-200">
              {currentSlide?.title?.content}
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center bg-gray-800 rounded-2xl p-10 shadow-2xl">
          <div className="mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mb-4"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Video Testimonial</h3>
          </div>
          
          {currentSlide?.paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className="font-normal leading-7 text-base text-gray-300 mb-4 italic"
            >
              "{paragraph}"
            </p>
          ))}

          <div className="flex items-center gap-4 mt-8">
            <button
              className="text-2xl text-cyan-400 hover:text-cyan-300 transition-colors bg-gray-700 rounded-full p-3"
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
                    idx === index ? "w-8 bg-cyan-400" : "w-2 bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <button
              className="text-2xl text-cyan-400 hover:text-cyan-300 transition-colors bg-gray-700 rounded-full p-3"
              onClick={handleNext}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {!isAddSlider && isAdmin && (
        <button
          className="capitalize border-2 border-white text-white rounded-lg cursor-pointer w-fit p-2 mx-auto mt-8 hover:bg-white/10"
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
            className="capitalize border-2 border-white text-white w-fit p-2 rounded-lg mx-auto mt-4 hover:bg-white/10"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialSliderType6;
