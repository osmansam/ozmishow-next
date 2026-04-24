import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerType } from "../../../shared/types";
import BorderBoxType2 from "./BorderBoxType2";

const BorderBoxContainerType2 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-24 bg-white" style={componentStyle}>
      <div className="flex justify-end mr-20 mb-4">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type2"
          isComponentType={true}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
        <div className="text-center">
          <h1
            className="font-light text-5xl text-gray-900 mb-4 inline-block relative"
            style={mainHeader?.style}
          >
            {mainHeader?.content}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-200"></span>
            <StyleModalContainer
              styleData={mainHeader}
              twoPictureId={id ?? ""}
              componentId={""}
              contentContainerType="mainHeader"
              isContentSend={true}
              type="mainMainHeader"
            />
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-y-12 gap-x-8">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBoxType2
                key={index}
                img={img}
                header={header}
                _id={id}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BorderBoxContainerType2;
