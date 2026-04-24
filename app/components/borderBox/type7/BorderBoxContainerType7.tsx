import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerType } from "../../../shared/types";
import BorderBoxType7 from "./BorderBoxType7";

const BorderBoxContainerType7 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-24 bg-black" style={componentStyle}>
      <div className="flex justify-end mr-20 mb-8">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type7"
          isComponentType={true}
        />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
            <h1
                className="font-black text-6xl text-white mb-4 tracking-tighter"
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
            <div className="w-full h-px bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBoxType7
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

export default BorderBoxContainerType7;
