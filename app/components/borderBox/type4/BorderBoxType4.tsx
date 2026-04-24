import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const BorderBoxType4 = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={img?.content}
          alt={header?.content}
          className="w-full h-full object-cover"
          style={img?.style}
        />
        <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>
        <ImageStyleModalContainer
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            type="twoPictureIndex"
            styleData={img}
        />
      </div>
      
      <div className="p-6 relative">
        <div className="absolute -top-8 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white">
            <BsArrowRight className={`text-2xl transition-transform duration-300 ${isHovered ? 'rotate-0' : '-rotate-45'}`} />
        </div>

        <h1
          className="font-bold text-xl text-gray-800 mb-2 mt-2"
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
        
        <p className="text-gray-600 text-sm leading-relaxed">
            Material design inspired card with depth, bold colors, and clear hierarchy. Perfect for showcasing features.
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Read Article</span>
            <span className="text-xs text-gray-400">5 min read</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BorderBoxType4;
