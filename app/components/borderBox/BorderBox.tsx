import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../shared/types";
const BorderBox = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="w-5/6  h-52 flex  gap-12 mx-auto items-center p-8 border-2 bg-white"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img
        src={img?.content}
        alt={header?.content}
        className="w-40 h-40 "
        style={img?.style}
      />
      <ImageStyleModalContainer
        twoPictureId={_id ?? ""}
        componentId={index?.toString() ?? ""}
        type="twoPictureIndex"
        styleData={img}
      />
      <div className="w-full flex justify-between ">
        <h1
          className="font-[700] text-2xl leading-8 flex flex-row gap-4 justify-center items-center"
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
        <div>
          <BsArrowRight
            className={`text-2xl justify-end ${
              isHovered ? "translate-x-4 transition duration-300 ease-out" : ""
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BorderBox;
