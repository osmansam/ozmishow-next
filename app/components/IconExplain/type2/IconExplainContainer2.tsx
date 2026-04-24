import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { IconExplainContainerTypes } from "../../../shared/compenentTypes";
import { IconExplainContainerType } from "../../../shared/types";
import IconExplain2 from "./IconExplain2";
const IconExplainContainer = ({
  mainHeader,
  iconExplainArray,
  componentStyle,
  componentType,
  id,
}: IconExplainContainerType) => {
  return (
    <div className="w-5/6 h-full mx-auto py-10 md:py-20" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          currentType={componentType}
          componentTypes={IconExplainContainerTypes}
          twoPictureId={id ?? ""}
        />
      </div>
      <h1
        className="w-fit font-[700] text-4xl leading-[44px] mb-3  text-[#333333] flex flex-row gap-2 rounded-2xl px-4 py-0.5 items-center"
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
      <div className="w-full h-full md:flex md:justify-between mx-auto">
        {iconExplainArray.map((iconExplain, index) => {
          const { img, header, paragraphs, buttons } = iconExplain;
          return (
            <IconExplain2
              _id={id}
              key={index}
              img={img}
              header={header}
              paragraphs={paragraphs}
              buttons={buttons}
              index={index}
            ></IconExplain2>
          );
        })}
      </div>
    </div>
  );
};
// deneme
export default IconExplainContainer;
