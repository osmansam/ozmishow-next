import { useNavigate } from "react-router-dom";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";

const IconExplain = ({
  _id,
  index,
  img,
  header,
  paragraphs,
  buttons,
}: PictureWithStyleType) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 md:pr-6 w-full md:w-1/3 h-full mt-8">
      {img && (
        <>
          <img
            src={img?.content}
            alt={header?.content}
            className="w-full h-60 mx-auto my-auto"
            style={img?.style}
          />
          <ImageStyleModalContainer
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            type="twoPictureIndex"
            styleData={img}
          />
        </>
      )}
      <h1
        className="w-fit mx-auto capitalize text-lg font-[500] leading-6 mt-2 text-[#333333] flex flex-row gap-8 rounded-2xl px-4 py-0.5 items-center"
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
      <div className="flex flex-col justify-center items-center  gap-2 w-full rounded-lg py-1  ">
        {paragraphs?.content && (
          <p
            key={index}
            className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
            style={paragraphs?.style ? paragraphs?.style : {}}
          >
            {paragraphs?.content[0]?.length &&
            paragraphs?.content[0]?.length > 250 ? (
              <>{paragraphs?.content[0]?.substring(0, 250)}...</>
            ) : (
              <>{paragraphs?.content[0]}</>
            )}
          </p>
        )}
      </div>
      <ContentModalContainer
        content={paragraphs}
        twoPictureId={_id ?? ""}
        componentId={index?.toString() ?? ""}
        contentContainerType="paragraphs"
        type="twoPictureIndex"
      />
      <button
        className="w-fit uppercase px-4 py-2 underline hover:no-underline mx-auto"
        onClick={() => {
          navigate(`/readMore/${_id}/${index?.toString()}`);
        }}
      >
        Read More
      </button>
    </div>
  );
};

export default IconExplain;
