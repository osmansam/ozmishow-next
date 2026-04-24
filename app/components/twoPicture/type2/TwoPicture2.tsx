import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const TwoPicture2 = ({
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
    <div className="w-full h-full flex flex-col lg:flex-row bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {img && (
        <div className="relative w-full lg:w-2/5 aspect-[4/3] lg:aspect-auto overflow-hidden group bg-gray-100">
          {img.content && !imageError ? (
            <img
              src={img.content}
              alt={header?.content}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              style={{ ...img.style, width: "100%", height: "100%" }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20"
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-4 right-4">
            <ImageStyleModalContainer
              twoPictureId={_id ?? ""}
              componentId={index?.toString() ?? ""}
              type="twoPictureIndex"
              styleData={img}
            />
          </div>
        </div>
      )}
      
      <div className="p-8 flex flex-col gap-6 flex-grow lg:w-3/5 justify-center">
        <div className="relative">
          <h1
            className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight capitalize"
            style={header?.style}
          >
            {header?.content}
            <span className="inline-block ml-2 align-middle">
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
        </div>

        <div className="flex-grow w-full">
          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            {paragraphs && (
              <p style={paragraphs?.style}>
                {paragraphs?.content?.[0] &&
                paragraphs?.content[0]?.length &&
                paragraphs?.content[0].length > 250 ? (
                  <>{paragraphs?.content[0]?.substring(0, 250)}...</>
                ) : (
                  <>{paragraphs?.content?.[0]}</>
                )}
              </p>
            )}
            <div className="mt-2 flex justify-start">
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

        <button
          className="w-fit group px-8 py-3 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          onClick={() => {
            navigate(`/readMore/${_id}/${index?.toString()}`);
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default TwoPicture2;
