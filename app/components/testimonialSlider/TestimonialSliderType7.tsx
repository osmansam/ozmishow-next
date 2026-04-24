import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
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

const TestimonialSliderType7 = ({
  mainMainHeader,
  sliderArray,
  id,
  componentStyle,
  componentType,
  page,
}: SliderType) => {
  const dispatch = useAppDispatch();
  const [isAddSlider, setIsAddSlider] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
      className="py-16 flex flex-col mx-auto justify-center items-center w-full"
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
      <h1 className="font-bold text-gray-900 text-4xl text-center mb-4">
        {mainMainHeader?.content}
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl">
        See what our customers have to say about their experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8 max-w-7xl mx-auto">
        {sliderArray.map((item, itemIndex) => {
          const { img, header, paragraphs, name, lastName } = item;
          const isExpanded = selectedIndex === itemIndex;
          
          return (
            <div
              key={itemIndex}
              className={`relative group cursor-pointer transition-all duration-500 ${
                isExpanded ? "md:col-span-2 lg:col-span-2" : ""
              }`}
              onClick={() =>
                setSelectedIndex(isExpanded ? null : itemIndex)
              }
            >
              <div
                className={`bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  isExpanded ? "h-auto" : "h-80"
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={img?.content}
                    alt={header?.content}
                    className={`w-full object-cover transition-all duration-300 ${
                      isExpanded ? "h-48" : "h-full"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 transition-all duration-300 ${
                      isExpanded ? "relative bg-none" : ""
                    }`}
                  >
                    {!isExpanded && (
                      <>
                        <FaQuoteLeft className="text-white/30 text-3xl mb-2" />
                        <h2 className="text-xl font-bold text-white capitalize">
                          {name?.content + " " + lastName?.content}
                        </h2>
                        <p className="text-sm text-gray-200">{header?.content}</p>
                      </>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 bg-white">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={img?.content}
                        alt={header?.content}
                        className="h-16 w-16 rounded-full object-cover border-2 border-teal-500"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 capitalize">
                          {name?.content + " " + lastName?.content}
                        </h2>
                        <p className="text-sm text-teal-600">{header?.content}</p>
                      </div>
                    </div>
                    {paragraphs?.content?.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-normal leading-6 text-sm text-gray-700 mb-3"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              
              {!isExpanded && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to read more
                  </span>
                </div>
              )}
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

export default TestimonialSliderType7;
