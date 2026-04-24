import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { CarouselType } from '../../shared/types';

import ComponentStyleModalContainer from '../../hooks/componentStyleModal/ComponentStyleModalContainer';

const CarouselType4: React.FC<CarouselType> = ({ carouselArray, componentStyle, id, componentType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselArray.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselArray.length) % carouselArray.length);
  };

  return (
    <div className="py-20 px-4 bg-gray-50 relative" style={componentStyle}>
      <div className="absolute top-4 right-4 z-50">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType={componentType ?? "type4"}
          isComponentType={true}
          componentTypes={["type1", "type2", "type3", "type4", "type5"]}
        />
      </div>
      <div className="container mx-auto max-w-4xl relative">
        <div className="absolute top-0 left-0 text-gray-200 transform -translate-x-1/2 -translate-y-1/2">
          <FaQuoteLeft size={120} />
        </div>

        <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-blue-100">
                <img 
                  src={carouselArray[currentIndex]?.img?.content || 'https://via.placeholder.com/150'} 
                  alt={carouselArray[currentIndex]?.header?.content} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-xl md:text-2xl text-gray-700 italic mb-6 leading-relaxed" style={carouselArray[currentIndex]?.paragraphs?.style}>
                "{carouselArray[currentIndex]?.paragraphs?.content?.[0]}"
              </p>

              <h3 className="text-lg font-bold text-gray-900" style={carouselArray[currentIndex]?.header?.style}>
                {carouselArray[currentIndex]?.header?.content}
              </h3>
              <span className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                {carouselArray[currentIndex]?.subHeaders?.content?.[0] || 'Customer'}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevSlide} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselType4;
