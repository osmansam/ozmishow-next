import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const BorderBoxType7 = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="w-full relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={img?.content}
          alt={header?.content}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={img?.style}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        <ImageStyleModalContainer
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            type="twoPictureIndex"
            styleData={img}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
        <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
            <h1
            className="font-bold text-3xl text-white mb-4 leading-tight"
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
            
            <p className="text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 max-w-md">
                Immersive experiences that capture attention and drive engagement.
            </p>

            <div className="flex items-center gap-3 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                <span>Explore Project</span>
                <BsArrowRight className="text-xl" />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BorderBoxType7;
