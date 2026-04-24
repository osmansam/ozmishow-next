import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CarouselType } from '../../shared/types';

import ComponentStyleModalContainer from '../../hooks/componentStyleModal/ComponentStyleModalContainer';

const CarouselType2: React.FC<CarouselType> = ({ carouselArray, componentStyle, mainMainHeader, id, componentType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Responsive logic could be added here

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(carouselArray.length / itemsPerPage));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(carouselArray.length / itemsPerPage)) % Math.ceil(carouselArray.length / itemsPerPage));
  };

  const visibleItems = carouselArray.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <div className="py-16 px-4 relative" style={componentStyle}>
      <div className="absolute top-4 right-4 z-50">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType={componentType ?? "type2"}
          isComponentType={true}
          componentTypes={["type1", "type2", "type3", "type4", "type5"]}
        />
      </div>
      {mainMainHeader && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold" style={mainMainHeader.style}>{mainMainHeader.content}</h2>
        </div>
      )}

      <div className="container mx-auto relative">
        <div className="flex justify-between items-center gap-6">
          <button onClick={prevSlide} className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-10">
            <FaChevronLeft />
          </button>

          <div className="flex-1 overflow-hidden">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              key={currentIndex}
            >
              {visibleItems.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.img?.content || 'https://via.placeholder.com/400x300'} 
                      alt={item.header?.content || 'Carousel Item'} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={item.header?.style}>{item.header?.content}</h3>
                    <p className="text-gray-600 text-sm" style={item.paragraphs?.style}>
                      {item.paragraphs?.content?.[0]}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button onClick={nextSlide} className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-10">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselType2;
