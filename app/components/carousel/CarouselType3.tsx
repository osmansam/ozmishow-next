import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CarouselType } from '../../shared/types';

import ComponentStyleModalContainer from '../../hooks/componentStyleModal/ComponentStyleModalContainer';

const CarouselType3: React.FC<CarouselType> = ({ carouselArray, componentStyle, id, componentType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselArray.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselArray.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselArray.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselArray.length) % carouselArray.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden" style={componentStyle}>
      <div className="absolute top-4 right-4 z-50">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType={componentType ?? "type3"}
          isComponentType={true}
          componentTypes={["type1", "type2", "type3", "type4", "type5"]}
        />
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${carouselArray[currentIndex]?.img?.content || 'https://via.placeholder.com/1920x1080'})` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={carouselArray[currentIndex]?.header?.style}
            >
              {carouselArray[currentIndex]?.header?.content}
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={carouselArray[currentIndex]?.paragraphs?.style}
            >
              {carouselArray[currentIndex]?.paragraphs?.content?.[0]}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all">
        <FaChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all">
        <FaChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselArray.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselType3;
