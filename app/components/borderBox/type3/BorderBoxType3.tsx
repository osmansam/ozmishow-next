import { motion } from "framer-motion";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const BorderBoxType3 = ({ img, header, _id, index }: PictureWithStyleType) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/3 relative overflow-hidden bg-gray-100">
            <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
            <img
            src={img?.content}
            alt={header?.content}
            className="w-full h-full object-cover min-h-[200px]"
            style={img?.style}
            />
            <ImageStyleModalContainer
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                type="twoPictureIndex"
                styleData={img}
            />
        </div>
        
        <div className="md:w-2/3 p-8 flex flex-col justify-between">
            <div>
                <div className="w-12 h-1 bg-blue-600 mb-6"></div>
                <h1
                className="font-bold text-2xl text-gray-900 mb-4"
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
                <p className="text-gray-600 leading-relaxed mb-6">
                    Professional solutions for your business needs. We deliver quality and excellence in every project.
                </p>
            </div>
            
            <div className="flex items-center gap-2 text-blue-700 font-semibold cursor-pointer group">
                <span>Learn More</span>
                <BsArrowRight className="transition-transform group-hover:translate-x-2" />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BorderBoxType3;
