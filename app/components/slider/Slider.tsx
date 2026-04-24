import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  getPageTwoPictures,
  resetTwoPictureArray,
  updateSlider,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { SliderTypes } from "../../shared/compenentTypes";
import { SliderType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import AddSliderItem from "./AddSliderItem";

const Slider = ({
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
    setIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? sliderArray.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex === sliderArray.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  const handleCreate = async () => {
    await dispatch(updateSlider({ container: twoPictureArray, id }));
    setIsAddSlider(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  const currentSlide = sliderArray[index];

  return (
    <div className="py-10 flex flex-col  w-full" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType={componentType}
          isComponentType={true}
          componentTypes={SliderTypes}
        />
      </div>
      <h1 className="font-[700] text-[#102a42] text-3xl flex justify-start py-2 items-start px-4 mx-auto">
        {mainMainHeader?.content}
      </h1>
      <div className="flex flex-col  py-6 shadow-2xl bg-white w-5/6 lg:w-2/5 min-h-[400px] mx-auto relative">
        <div className="relative flex justify-center items-center">
          <div className="radius-ball absolute top-1/2  ml-3 transform translate-y-[-50%] w-40 h-40 rounded-full bg-blue-400 z-0"></div>
          <img
            src={currentSlide?.img?.content}
            alt={currentSlide?.header?.content}
            className="w-40 h-40 rounded-full z-10 object-cover"
          />
          {/* <FaQuoteRight className="z-40" /> */}
        </div>

        <h2 className="text-lg leading-7 font-[700] text-center text-[#102a42] capitalize p-1">
          {currentSlide?.name?.content + "  " + currentSlide?.lastName?.content}
        </h2>
        <p className="text-center text-[#617d98]  font-[400] leading-6">
          {currentSlide?.title?.content}
        </p>
        {currentSlide?.paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className=" font-[400] leading-6 text-sm text-center px-6 py-2"
            style={{ color: "#617d98" }}
          >
            {paragraph}
          </p>
        ))}
        <div className="absolute bottom-3 left-0 flex justify-center items-center w-full">
          <button
            className="prev text-xl text-primary-7 border-0 bg-transparent text-[#99d0fa]"
            onClick={handlePrev}
          >
            <FiChevronLeft />
          </button>
          <button
            className="next text-xl text-primary-7 border-0 bg-transparent  text-[#99d0fa]"
            onClick={handleNext}
          >
            <FiChevronRight />
          </button>
        </div>
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

export default Slider;
