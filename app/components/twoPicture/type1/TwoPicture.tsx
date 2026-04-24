import { useState } from "react";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";

const TwoPicture = ({
  img,
  header,
  paragraphs,
  buttons,
  _id,
  index,
}: PictureWithStyleType) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {img && (
        <div className="relative w-full aspect-[4/3] overflow-hidden group bg-gray-100">
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
      
      <div className="p-8 flex flex-col gap-6 flex-grow">
        <div className="relative">
          <h1
            className="text-2xl font-bold text-gray-900 leading-tight"
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

        <div className="flex-grow">
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {paragraphs?.content?.map((paragraph, index) => (
              <p key={index} style={paragraphs?.style}>
                {paragraph}
              </p>
            ))}
            <div className="mt-2">
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

        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-auto pt-4">
            {buttons.map((button, ind) => (
              <div
                key={ind}
                className="relative group"
                style={button.style}
              >
                <ButtonUnderline text={button.content} buttonLink={button.link} />
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <StyleModalContainer
                    styleData={button}
                    twoPictureId={_id ?? ""}
                    componentId={index?.toString() ?? ""}
                    contentContainerType="buttons"
                    isContentSend={true}
                    type="twoPictureIndex"
                    buttonIndex={ind}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoPicture;
