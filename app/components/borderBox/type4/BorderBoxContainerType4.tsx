import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerType } from "../../../shared/types";
import BorderBoxType4 from "./BorderBoxType4";

const BorderBoxContainerType4 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-20 bg-gray-100" style={componentStyle}>
      <div className="flex justify-end mr-20 mb-8">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type4"
          isComponentType={true}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1
                className="font-bold text-4xl text-gray-800 mb-4"
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
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBoxType4
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

export default BorderBoxContainerType4;
