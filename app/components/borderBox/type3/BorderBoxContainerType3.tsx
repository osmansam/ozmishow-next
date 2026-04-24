import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerType } from "../../../shared/types";
import BorderBoxType3 from "./BorderBoxType3";

const BorderBoxContainerType3 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-20 bg-gray-50" style={componentStyle}>
      <div className="flex justify-end mr-20 mb-8">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type3"
          isComponentType={true}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Our Services</span>
            <h1
                className="font-extrabold text-4xl text-gray-900 mt-2"
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBoxType3
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

export default BorderBoxContainerType3;
