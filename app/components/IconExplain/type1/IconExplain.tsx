import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";
import ButtonUnderline from "../../buttonUnderline/ButtonUnderline";

const IconExplain = ({
  _id,
  index,
  img,
  header,
  paragraphs,
  buttons,
}: PictureWithStyleType) => {
  return (
    <div className="flex flex-col gap-4 md:pr-6 w-full md:w-1/3 h-full mt-8">
      {img && (
        <>
          <img
            src={img?.content}
            alt={header?.content}
            className="w-full h-60"
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
        className="text-lg font-[500] leading-6 mt-2 text-[#333333] flex flex-row gap-8 rounded-2xl px-4 py-0.5"
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
      <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
        {paragraphs?.content?.map((paragraph, index) => (
          <p
            key={index}
            className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
            style={paragraphs?.style ? paragraphs?.style : {}}
          >
            {paragraph}
          </p>
        ))}
      </div>
      <ContentModalContainer
        content={paragraphs}
        twoPictureId={_id ?? ""}
        componentId={index?.toString() ?? ""}
        contentContainerType="paragraphs"
        type="twoPictureIndex"
      />
      <div className="w-full flex gap-8 flex-row">
        {buttons &&
          buttons.map((button, index) => (
            <div className="mt-4" key={index}>
              <ButtonUnderline
                text={button.content}
                buttonLink={button.link}
              ></ButtonUnderline>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IconExplain;
