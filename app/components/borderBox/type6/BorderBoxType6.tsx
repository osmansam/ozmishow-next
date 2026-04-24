import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const BorderBoxType6 = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Random blob shape for variety (simulated with border-radius)
  const borderRadius = (index ?? 0) % 2 === 0 
    ? "60% 40% 30% 70% / 60% 30% 70% 40%" 
    : "30% 70% 70% 30% / 30% 30% 70% 70%";

  return (
    <motion.div
      className="w-full flex flex-col items-center p-6 relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative mb-6">
        <div 
            className="absolute inset-0 bg-yellow-100 -z-10 transform scale-110 rotate-6 transition-transform duration-500"
            style={{ borderRadius, transform: isHovered ? "scale(1.2) rotate(12deg)" : "scale(1.1) rotate(6deg)" }}
        ></div>
        <div 
            className="w-48 h-48 overflow-hidden bg-white shadow-sm"
            style={{ borderRadius }}
        >
            <img
            src={img?.content}
            alt={header?.content}
            className="w-full h-full object-cover"
            style={img?.style}
            />
            <ImageStyleModalContainer
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                type="twoPictureIndex"
                styleData={img}
            />
        </div>
      </div>
      
      <div className="text-center z-10">
        <h1
          className="font-bold text-2xl text-gray-800 mb-3"
          style={header?.style ? header?.style : {}}
        >
          {header?.content}
          <StyleModalContainer
            styleData={header}
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            contentContainerType="header"
            isContentSend={true}
            type="twoPictureIndex"
          />
        </h1>
        
        <p className="text-gray-600 mb-4 font-medium">
            Creative & Playful
        </p>

        <motion.button
            className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full flex items-center gap-2 mx-auto hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Explore <BsArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BorderBoxType6;
