import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const TwoPicture3 = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  index,
}: PictureWithStyleType) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[500px] bg-gray-900 rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl">
      {/* Background Image */}
      {img && (
        <div className="absolute inset-0 w-full h-full">
          {img.content && !imageError ? (
            <img
              src={img.content}
              alt={header?.content}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
              style={{ ...img.style, width: "100%", height: "100%" }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 opacity-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          {/* Image Edit Button */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ImageStyleModalContainer
              twoPictureId={_id ?? ""}
              componentId={index?.toString() ?? ""}
              type="twoPictureIndex"
              styleData={img}
            />
          </div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h1
            className="text-3xl font-bold text-white mb-4 leading-tight drop-shadow-lg"
            style={header?.style}
          >
            {header?.content}
            <span className="inline-block ml-2 align-middle opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <StyleModalContainer
                styleData={header}
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentContainerType="header"
                isContentSend={true}
                type="twoPictureIndex"
              />
            </span>
          </h1>

          <div className="space-y-4">
            <div className="text-gray-200 text-lg leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
              {paragraphs && (
                <p style={paragraphs?.style}>
                  {paragraphs?.content?.[0]}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <button
                className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-medium"
                onClick={() => {
                  navigate(`/readMore/${_id}/${index?.toString()}`);
                }}
              >
                Read More
              </button>
              
              <ContentModalContainer
                content={paragraphs}
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentContainerType="paragraphs"
                type="twoPictureIndex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoPicture3;
