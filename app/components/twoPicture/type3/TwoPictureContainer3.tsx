import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerTypes } from "../../../shared/compenentTypes";
import { TwoPictureContainerType } from "../../../shared/types";
import TwoPicture3 from "./TwoPicture3";

const TwoPictureContainer3 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  componentType,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-5/6 h-full mx-auto py-10 " style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType={componentType}
          componentTypes={TwoPictureContainerTypes}
          twoPictureId={id ?? ""}
        />
      </div>
      <h1
        className=" font-[700] text-4xl leading-[44px] mb-2 text-[#333333] w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
        style={mainHeader?.style}
      >
        {mainHeader?.content}
        <StyleModalContainer
          styleData={mainHeader}
          twoPictureId={id ?? ""}
          componentId={""}
          contentContainerType="mainHeader"
          isContentSend={true}
          type="mainMainHeader"
        />
      </h1>
      <div className="md:flex md:justify-center gap-8 mx-auto">
        {twoPictureArray.map((twoPicture, index) => {
          const { img, header, paragraphs, buttons } = twoPicture;
          return (
            <TwoPicture3
              _id={id}
              index={index}
              key={index}
              img={img}
              header={header}
              paragraphs={paragraphs}
              buttons={buttons}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TwoPictureContainer3;
