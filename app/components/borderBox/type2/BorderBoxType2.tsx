import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const BorderBoxType2 = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="w-full md:w-5/6 h-auto min-h-[200px] flex flex-col md:flex-row gap-8 mx-auto items-center p-8 bg-white border-b-2 border-gray-100 hover:border-gray-300 transition-colors duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={img?.content}
          alt={header?.content}
          className="w-32 h-32 object-cover transition-transform duration-500 ease-in-out"
          style={{
             ...img?.style,
             transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
        />
        <ImageStyleModalContainer
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            type="twoPictureIndex"
            styleData={img}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="w-full flex justify-between items-center">
            <h1
            className="font-light text-3xl text-gray-800 tracking-wide"
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
            
            <motion.div 
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
            <BsArrowRight className="text-2xl text-gray-400 font-thin" />
            </motion.div>
        </div>
        <p className="text-gray-500 font-light text-sm">
            Discover more about this topic
        </p>
      </div>
    </motion.div>
  );
};

export default BorderBoxType2;
