import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const BorderBoxType5 = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="w-full bg-[#e0e5ec] rounded-[30px] p-8"
      style={{
        boxShadow: isHovered 
            ? "inset 9px 9px 16px rgb(163,177,198,0.6), inset -9px -9px 16px rgba(255,255,255, 0.5)"
            : "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center text-center">
        <div 
            className="w-32 h-32 rounded-full p-2 mb-6 flex items-center justify-center overflow-hidden"
            style={{
                boxShadow: "inset 6px 6px 10px 0 rgba(163, 177, 198, 0.7), inset -6px -6px 10px 0 rgba(255, 255, 255, 0.8)"
            }}
        >
            <img
            src={img?.content}
            alt={header?.content}
            className="w-full h-full object-cover rounded-full"
            style={img?.style}
            />
            <ImageStyleModalContainer
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                type="twoPictureIndex"
                styleData={img}
            />
        </div>
        
        <h1
          className="font-semibold text-xl text-[#4d5b7c] mb-4"
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
        
        <p className="text-[#7d8bb0] mb-8 text-sm">
            Soft UI design that mimics real-world objects. Clean, modern, and tactile.
        </p>

        <button 
            className="w-12 h-12 rounded-full flex items-center justify-center text-[#4d5b7c] transition-all duration-200"
            style={{
                boxShadow: isHovered
                    ? "inset 4px 4px 8px rgb(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255, 0.5)"
                    : "6px 6px 10px rgb(163,177,198,0.6), -6px -6px 10px rgba(255,255,255, 0.5)"
            }}
        >
            <BsArrowRight className="text-xl" />
        </button>
      </div>
    </motion.div>
  );
};

export default BorderBoxType5;
