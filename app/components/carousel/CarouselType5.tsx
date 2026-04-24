import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { CarouselType } from '../../shared/types';

import ComponentStyleModalContainer from '../../hooks/componentStyleModal/ComponentStyleModalContainer';

const CarouselType5: React.FC<CarouselType> = ({ carouselArray, componentStyle, id, componentType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselArray.length);
  };

  return (
    <div className="py-20 px-4 bg-gray-900 text-white overflow-hidden relative" style={componentStyle}>
      <div className="absolute top-4 right-4 z-50">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType={componentType ?? "type5"}
          isComponentType={true}
          componentTypes={["type1", "type2", "type3", "type4", "type5"]}
        />
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        <div className="lg:w-1/2 z-10">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={carouselArray[currentIndex]?.header?.style}>
                {carouselArray[currentIndex]?.header?.content}
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md" style={carouselArray[currentIndex]?.paragraphs?.style}>
                {carouselArray[currentIndex]?.paragraphs?.content?.[0]}
              </p>
              <button 
                onClick={nextSlide}
                className="group flex items-center gap-3 text-lg font-semibold border-b-2 border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-all"
              >
                Next Project <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:w-1/2 relative h-[500px] w-full perspective-1000">
          <AnimatePresence initial={false}>
            {carouselArray.map((item, index) => {
              // Calculate relative position
              const offset = (index - currentIndex + carouselArray.length) % carouselArray.length;
              
              // Only show 3 items: current, next, and previous (as last)
              if (offset > 2 && offset !== carouselArray.length - 1) return null;

              let zIndex = 0;
              let x = '0%';
              let scale = 1;
              let opacity = 1;
              let rotateY = 0;

              if (offset === 0) {
                zIndex = 30;
                x = '0%';
                scale = 1;
                opacity = 1;
                rotateY = 0;
              } else if (offset === 1) {
                zIndex = 20;
                x = '20%';
                scale = 0.85;
                opacity = 0.6;
                rotateY = -15;
              } else if (offset === 2) {
                zIndex = 10;
                x = '40%';
                scale = 0.7;
                opacity = 0.3;
                rotateY = -25;
              } else { // Last item (previous)
                zIndex = 0;
                x = '-100%'; // Hide offscreen
                opacity = 0;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  initial={false}
                  animate={{ 
                    zIndex, 
                    x, 
                    scale, 
                    opacity,
                    rotateY,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformPerspective: 1000 }}
                >
                  <img 
                    src={item.img?.content || 'https://via.placeholder.com/600x800'} 
                    alt={item.header?.content} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CarouselType5;
